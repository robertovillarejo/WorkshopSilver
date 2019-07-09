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
                <div class="container">
                    <img v-for="(photo, photoIndex) in photos" v-bind:key="photoIndex" @click="index = photoIndex" v-bind:src="'data:' + photo.photoContentType + ';base64,' + photo.photo" style="max-height: 100px;" alt="photo image">
                </div>
                <gallery :index="index" @close="index = null" :images="gallery()"/>

                <h3 class="jh-entity-heading"><span v-text="$t('workshopSilverApp.mold.home.title')">Molds</span></h3>
                <div class="table-responsive" v-if="molds && molds.length > 0">
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th><span v-text="$t('workshopSilverApp.mold.number')">Number</span></th>
                                <th><span v-text="$t('workshopSilverApp.mold.size')">Size</span></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="mold of molds" :key="mold.id">
                                <td>
                                    <router-link :to="{name: 'MoldView', params: {moldId: mold.id}}">{{mold.number}}</router-link>
                                </td>
                                <td v-text="$t('workshopSilverApp.SizeModel.' + mold.size)">{{mold.size}}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
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
