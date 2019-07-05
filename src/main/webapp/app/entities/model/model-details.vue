<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <div v-if="model">
                <h2 class="jh-entity-heading"><span v-text="$t('workshopSilverApp.model.detail.title')">Model</span> {{model.id}}</h2>
                <dl class="row jh-entity-details">
                    <dt>
                        <span v-text="$t('workshopSilverApp.model.name')">Name</span>
                    </dt>
                    <dd>
                        <span>{{model.name}}</span>
                    </dd>
                </dl>
                <button type="submit"
                        v-on:click.prevent="previousState()"
                        class="btn btn-info">
                    <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
                </button>
                <router-link v-if="model.id" :to="{name: 'ModelEdit', params: {modelId: model.id}}" tag="button" class="btn btn-primary">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./model-details.component.ts">
</script>
