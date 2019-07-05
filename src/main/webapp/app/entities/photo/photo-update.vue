<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id="workshopSilverApp.photo.home.createOrEditLabel" v-text="$t('workshopSilverApp.photo.home.createOrEditLabel')">Create or edit a Photo</h2>
                <div>
                    <div class="form-group" v-if="photo.id">
                        <label for="id" v-text="$t('global.field.id')">ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="photo.id" readonly />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('workshopSilverApp.photo.photo')" for="photo-photo">Photo</label>
                        <div>
                            <img v-bind:src="'data:' + photo.photoContentType + ';base64,' + photo.photo" style="max-height: 100px;" v-if="photo.photo" alt="photo image"/>
                            <div v-if="photo.photo" class="form-text text-danger clearfix">
                                <span class="pull-left">{{photo.photoContentType}}, {{byteSize(photo.photo)}}</span>
                                <button type="button" v-on:click="clearInputImage('photo', 'photoContentType', 'file_photo')" class="btn btn-secondary btn-xs pull-right">
                                    <font-awesome-icon icon="times"></font-awesome-icon>
                                </button>
                            </div>
                            <input type="file" ref="file_photo" id="file_photo" v-on:change="setFileData($event, photo, 'photo', true)" accept="image/*" v-text="$t('entity.action.addimage')"/>
                        </div>
                        <input type="hidden" class="form-control" name="photo" id="photo-photo"
                            :class="{'valid': !$v.photo.photo.$invalid, 'invalid': $v.photo.photo.$invalid }" v-model="$v.photo.photo.$model"  required/>
                        <input type="hidden" class="form-control" name="photoContentType" id="photo-photoContentType"
                            v-model="photo.photoContentType" />
                        <div v-if="$v.photo.photo.$anyDirty && $v.photo.photo.$invalid">
                            <small class="form-text text-danger" v-if="!$v.photo.photo.required" v-text="$t('entity.validation.required')">
                                This field is required.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('workshopSilverApp.photo.footer')" for="photo-footer">Footer</label>
                        <input type="text" class="form-control" name="footer" id="photo-footer"
                            :class="{'valid': !$v.photo.footer.$invalid, 'invalid': $v.photo.footer.$invalid }" v-model="$v.photo.footer.$model" />
                        <div v-if="$v.photo.footer.$anyDirty && $v.photo.footer.$invalid">
                            <small class="form-text text-danger" v-if="!$v.photo.footer.maxLength" v-bind:value="$t('entity.validation.maxlength')">
                                This field cannot be longer than 25 characters.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-bind:value="$t('workshopSilverApp.photo.model')" for="photo-model">Model</label>
                        <select class="form-control" id="photo-model" name="model" v-model="photo.model">
                            <option v-bind:value="null"></option>
                            <option v-bind:value="photo.model && modelOption.id === photo.model.id ? photo.model : modelOption" v-for="modelOption in models" :key="modelOption.id">{{modelOption.id}}</option>
                        </select>
                    </div>
                </div>
                <div>
                    <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
                        <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.cancel')">Cancel</span>
                    </button>
                    <button type="submit" id="save-entity" :disabled="$v.photo.$invalid || isSaving" class="btn btn-primary">
                        <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./photo-update.component.ts">
</script>
