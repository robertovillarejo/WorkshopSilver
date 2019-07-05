<template>
    <div>
        <h2 id="page-heading">
            <span v-text="$t('workshopSilverApp.photo.home.title')" id="photo-heading">Photos</span>
            <router-link :to="{name: 'PhotoCreate'}" tag="button" id="jh-create-entity" class="btn btn-primary float-right jh-create-entity create-photo">
                <font-awesome-icon icon="plus"></font-awesome-icon>
                <span  v-text="$t('workshopSilverApp.photo.home.createLabel')">
                    Create new Photo
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
        <div class="alert alert-warning" v-if="!isFetching && photos && photos.length === 0">
            <span v-text="$t('workshopSilverApp.photo.home.notFound')">No photos found</span>
        </div>
        <div class="table-responsive" v-if="photos && photos.length > 0">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th><span v-text="$t('global.field.id')">ID</span></th>
                    <th><span v-text="$t('workshopSilverApp.photo.photo')">Photo</span></th>
                    <th><span v-text="$t('workshopSilverApp.photo.footer')">Footer</span></th>
                    <th><span v-text="$t('workshopSilverApp.photo.model')">Model</span></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="photo in photos"
                    :key="photo.id">
                    <td>
                        <router-link :to="{name: 'PhotoView', params: {photoId: photo.id}}">{{photo.id}}</router-link>
                    </td>
                    <td>
                        <a v-if="photo.photo" v-on:click="openFile(photo.photoContentType, photo.photo)">
                            <img v-bind:src="'data:' + photo.photoContentType + ';base64,' + photo.photo" style="max-height: 30px;" alt="photo image"/>
                        </a>
                        <span v-if="photo.photo">{{photo.photoContentType}}, {{byteSize(photo.photo)}}</span>
                    </td>
                    <td>{{photo.footer}}</td>
                    <td>
                        <div v-if="photo.model">
                            <router-link :to="{name: 'ModelView', params: {modelId: photo.model.id}}">{{photo.model.id}}</router-link>
                        </div>
                    </td>
                    <td class="text-right">
                        <div class="btn-group flex-btn-group-container">
                            <router-link :to="{name: 'PhotoView', params: {photoId: photo.id}}" tag="button" class="btn btn-info btn-sm details">
                                <font-awesome-icon icon="eye"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                            </router-link>
                            <router-link :to="{name: 'PhotoEdit', params: {photoId: photo.id}}"  tag="button" class="btn btn-primary btn-sm edit">
                                <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>
                            </router-link>
                            <b-button v-on:click="prepareRemove(photo)"
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
            <span slot="modal-title"><span id="workshopSilverApp.photo.delete.question" v-text="$t('entity.delete.title')">Confirm delete operation</span></span>
            <div class="modal-body">
                <p id="jhi-delete-photo-heading" v-bind:title="$t('workshopSilverApp.photo.delete.question')">Are you sure you want to delete this Photo?</p>
            </div>
            <div slot="modal-footer">
                <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
                <button type="button" class="btn btn-primary" id="jhi-confirm-delete-photo" v-text="$t('entity.action.delete')" v-on:click="removePhoto()">Delete</button>
            </div>
        </b-modal>
    </div>
</template>

<script lang="ts" src="./photo.component.ts">
</script>
