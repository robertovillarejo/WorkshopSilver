<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <div v-if="photo">
                <h2 class="jh-entity-heading"><span v-text="$t('workshopSilverApp.photo.detail.title')">Photo</span> {{photo.id}}</h2>
                <dl class="row jh-entity-details">
                    <dt>
                        <span v-text="$t('workshopSilverApp.photo.photo')">Photo</span>
                    </dt>
                    <dd>
                        <div v-if="photo.photo">
                            <a v-on:click="openFile(photo.photoContentType, photo.photo)">
                                <img v-bind:src="'data:' + photo.photoContentType + ';base64,' + photo.photo" style="max-width: 100%;" alt="photo image"/>
                            </a>
                            {{photo.photoContentType}}, {{byteSize(photo.photo)}}
                        </div>
                    </dd>
                    <dt>
                        <span v-text="$t('workshopSilverApp.photo.footer')">Footer</span>
                    </dt>
                    <dd>
                        <span>{{photo.footer}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('workshopSilverApp.photo.model')">Model</span>
                    </dt>
                    <dd>
                        <div v-if="photo.model">
                            <router-link :to="{name: 'ModelView', params: {modelId: photo.model.id}}">{{photo.model.id}}</router-link>
                        </div>
                    </dd>
                </dl>
                <button type="submit"
                        v-on:click.prevent="previousState()"
                        class="btn btn-info">
                    <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
                </button>
                <router-link v-if="photo.id" :to="{name: 'PhotoEdit', params: {photoId: photo.id}}" tag="button" class="btn btn-primary">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./photo-details.component.ts">
</script>
