<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <div v-if="mold">
                <h2 class="jh-entity-heading"><span v-text="$t('workshopSilverApp.mold.detail.title')">Mold</span> {{mold.id}}</h2>
                <dl class="row jh-entity-details">
                    <dt>
                        <span v-text="$t('workshopSilverApp.mold.number')">Number</span>
                    </dt>
                    <dd>
                        <span>{{mold.number}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('workshopSilverApp.mold.size')">Size</span>
                    </dt>
                    <dd>
                        <span v-text="$t('workshopSilverApp.SizeModel.' + mold.size)">{{mold.size}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('workshopSilverApp.mold.models')">Models</span>
                    </dt>
                    <dd>
                        <span v-for="(models, i) in mold.models" :key="models.id">{{i > 0 ? ', ' : ''}}
                            <router-link :to="{name: 'ModelView', params: {modelsId: models.id}}">{{models.name}}</router-link>
                        </span>
                    </dd>
                </dl>
                <button type="submit"
                        v-on:click.prevent="previousState()"
                        class="btn btn-info">
                    <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
                </button>
                <router-link v-if="mold.id" :to="{name: 'MoldEdit', params: {moldId: mold.id}}" tag="button" class="btn btn-primary">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./mold-details.component.ts">
</script>
