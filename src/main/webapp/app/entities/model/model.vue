<template>
    <div>
        <h2 id="page-heading">
            <span v-text="$t('workshopSilverApp.model.home.title')" id="model-heading">Models</span>
            <router-link :to="{name: 'ModelCreate'}" tag="button" id="jh-create-entity" class="btn btn-primary float-right jh-create-entity create-model">
                <font-awesome-icon icon="plus"></font-awesome-icon>
                <span  v-text="$t('workshopSilverApp.model.home.createLabel')">
                    Create new Model
                </span>
            </router-link>
        </h2>
        <b-alert :show="dismissCountDown"
            dismissible
            :variant="alertType"
            @dismissed="dismissCountDown=0"
            @dismiss-count-down="countDownChanged">
            {{alertMessage}}
        </b-alert>
        <br/>
        <div class="alert alert-warning" v-if="!isFetching && models && models.length === 0">
            <span v-text="$t('workshopSilverApp.model.home.notFound')">No models found</span>
        </div>
        <div class="table-responsive" v-if="models && models.length > 0">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th v-on:click="changeOrder('id')"><span v-text="$t('global.field.id')">ID</span> <font-awesome-icon icon="sort"></font-awesome-icon></th>
                    <th v-on:click="changeOrder('name')"><span v-text="$t('workshopSilverApp.model.name')">Name</span> <font-awesome-icon icon="sort"></font-awesome-icon></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="model of orderBy(models, propOrder, reverse === true ? 1 : -1)"
                    :key="model.id">
                    <td>
                        <router-link :to="{name: 'ModelView', params: {modelId: model.id}}">{{model.id}}</router-link>
                    </td>
                    <td>{{model.name}}</td>
                    <td class="text-right">
                        <div class="btn-group flex-btn-group-container">
                            <router-link :to="{name: 'ModelView', params: {modelId: model.id}}" tag="button" class="btn btn-info btn-sm details">
                                <font-awesome-icon icon="eye"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                            </router-link>
                            <router-link :to="{name: 'ModelEdit', params: {modelId: model.id}}"  tag="button" class="btn btn-primary btn-sm edit">
                                <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>
                            </router-link>
                            <b-button v-on:click="prepareRemove(model)"
                                   variant="danger"
                                   class="btn btn-sm"
                                   v-b-modal.removeEntity>
                                <font-awesome-icon icon="times"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.delete')">Delete</span>
                            </b-button>
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
        <b-modal ref="removeEntity" id="removeEntity" >
            <span slot="modal-title"><span id="workshopSilverApp.model.delete.question" v-text="$t('entity.delete.title')">Confirm delete operation</span></span>
            <div class="modal-body">
                <p id="jhi-delete-model-heading" v-bind:title="$t('workshopSilverApp.model.delete.question')">Are you sure you want to delete this Model?</p>
            </div>
            <div slot="modal-footer">
                <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
                <button type="button" class="btn btn-primary" id="jhi-confirm-delete-model" v-text="$t('entity.action.delete')" v-on:click="removeModel()">Delete</button>
            </div>
        </b-modal>
        <div v-if="models && models.length">
            <div class="row justify-content-center">
                <jhi-item-count :page="page" :total="queryCount" :itemsPerPage="itemsPerPage"></jhi-item-count>
            </div>
            <div class="row justify-content-center">
                <b-pagination size="md" :total-rows="totalItems" v-model="page" :per-page="itemsPerPage" :change="loadPage(page)"></b-pagination>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./model.component.ts">
</script>
