package io.github.robertovillarejo.web.rest;

import io.github.robertovillarejo.WorkshopSilverApp;

import io.github.robertovillarejo.domain.Mold;
import io.github.robertovillarejo.domain.Model;
import io.github.robertovillarejo.repository.MoldRepository;
import io.github.robertovillarejo.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import io.github.robertovillarejo.domain.enumeration.SizeModel;
/**
 * Test class for the MoldResource REST controller.
 *
 * @see MoldResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = WorkshopSilverApp.class)
public class MoldResourceIntTest {

    private static final String DEFAULT_NUMBER = "AAAAAAAAAA";
    private static final String UPDATED_NUMBER = "BBBBBBBBBB";

    private static final SizeModel DEFAULT_SIZE = SizeModel.SMALL;
    private static final SizeModel UPDATED_SIZE = SizeModel.MEDIUM;

    @Autowired
    private MoldRepository moldRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restMoldMockMvc;

    private Mold mold;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final MoldResource moldResource = new MoldResource(moldRepository);
        this.restMoldMockMvc = MockMvcBuilders.standaloneSetup(moldResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Mold createEntity(EntityManager em) {
        Mold mold = new Mold()
            .number(DEFAULT_NUMBER)
            .size(DEFAULT_SIZE);
        // Add required entity
        Model model = ModelResourceIntTest.createEntity(em);
        em.persist(model);
        em.flush();
        mold.getModels().add(model);
        return mold;
    }

    @Before
    public void initTest() {
        mold = createEntity(em);
    }

    @Test
    @Transactional
    public void createMold() throws Exception {
        int databaseSizeBeforeCreate = moldRepository.findAll().size();

        // Create the Mold
        restMoldMockMvc.perform(post("/api/molds")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mold)))
            .andExpect(status().isCreated());

        // Validate the Mold in the database
        List<Mold> moldList = moldRepository.findAll();
        assertThat(moldList).hasSize(databaseSizeBeforeCreate + 1);
        Mold testMold = moldList.get(moldList.size() - 1);
        assertThat(testMold.getNumber()).isEqualTo(DEFAULT_NUMBER);
        assertThat(testMold.getSize()).isEqualTo(DEFAULT_SIZE);
    }

    @Test
    @Transactional
    public void createMoldWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = moldRepository.findAll().size();

        // Create the Mold with an existing ID
        mold.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restMoldMockMvc.perform(post("/api/molds")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mold)))
            .andExpect(status().isBadRequest());

        // Validate the Mold in the database
        List<Mold> moldList = moldRepository.findAll();
        assertThat(moldList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNumberIsRequired() throws Exception {
        int databaseSizeBeforeTest = moldRepository.findAll().size();
        // set the field null
        mold.setNumber(null);

        // Create the Mold, which fails.

        restMoldMockMvc.perform(post("/api/molds")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mold)))
            .andExpect(status().isBadRequest());

        List<Mold> moldList = moldRepository.findAll();
        assertThat(moldList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllMolds() throws Exception {
        // Initialize the database
        moldRepository.saveAndFlush(mold);

        // Get all the moldList
        restMoldMockMvc.perform(get("/api/molds?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(mold.getId().intValue())))
            .andExpect(jsonPath("$.[*].number").value(hasItem(DEFAULT_NUMBER.toString())))
            .andExpect(jsonPath("$.[*].size").value(hasItem(DEFAULT_SIZE.toString())));
    }

    @Test
    @Transactional
    public void getMold() throws Exception {
        // Initialize the database
        moldRepository.saveAndFlush(mold);

        // Get the mold
        restMoldMockMvc.perform(get("/api/molds/{id}", mold.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(mold.getId().intValue()))
            .andExpect(jsonPath("$.number").value(DEFAULT_NUMBER.toString()))
            .andExpect(jsonPath("$.size").value(DEFAULT_SIZE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingMold() throws Exception {
        // Get the mold
        restMoldMockMvc.perform(get("/api/molds/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateMold() throws Exception {
        // Initialize the database
        moldRepository.saveAndFlush(mold);
        int databaseSizeBeforeUpdate = moldRepository.findAll().size();

        // Update the mold
        Mold updatedMold = moldRepository.findOne(mold.getId());
        updatedMold
            .number(UPDATED_NUMBER)
            .size(UPDATED_SIZE);

        restMoldMockMvc.perform(put("/api/molds")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedMold)))
            .andExpect(status().isOk());

        // Validate the Mold in the database
        List<Mold> moldList = moldRepository.findAll();
        assertThat(moldList).hasSize(databaseSizeBeforeUpdate);
        Mold testMold = moldList.get(moldList.size() - 1);
        assertThat(testMold.getNumber()).isEqualTo(UPDATED_NUMBER);
        assertThat(testMold.getSize()).isEqualTo(UPDATED_SIZE);
    }

    @Test
    @Transactional
    public void updateNonExistingMold() throws Exception {
        int databaseSizeBeforeUpdate = moldRepository.findAll().size();

        // Create the Mold

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restMoldMockMvc.perform(put("/api/molds")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mold)))
            .andExpect(status().isCreated());

        // Validate the Mold in the database
        List<Mold> moldList = moldRepository.findAll();
        assertThat(moldList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteMold() throws Exception {
        // Initialize the database
        moldRepository.saveAndFlush(mold);
        int databaseSizeBeforeDelete = moldRepository.findAll().size();

        // Get the mold
        restMoldMockMvc.perform(delete("/api/molds/{id}", mold.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Mold> moldList = moldRepository.findAll();
        assertThat(moldList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Mold.class);
        Mold mold1 = new Mold();
        mold1.setId(1L);
        Mold mold2 = new Mold();
        mold2.setId(mold1.getId());
        assertThat(mold1).isEqualTo(mold2);
        mold2.setId(2L);
        assertThat(mold1).isNotEqualTo(mold2);
        mold1.setId(null);
        assertThat(mold1).isNotEqualTo(mold2);
    }
}
