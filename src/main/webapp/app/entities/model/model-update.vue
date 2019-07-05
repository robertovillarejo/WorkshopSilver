<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id="workshopSilverApp.model.home.createOrEditLabel" v-text="$t('workshopSilverApp.model.home.createOrEditLabel')">Create or edit a Model</h2>
                <div>
                    <div class="form-group" v-if="model.id">
                        <label for="id" v-text="$t('global.field.id')">ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="model.id" readonly />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('workshopSilverApp.model.name')" for="model-name">Name</label>
                        <input type="text" class="form-control" name="name" id="model-name"
                            :class="{'valid': !$v.model.name.$invalid, 'invalid': $v.model.name.$invalid }" v-model="$v.model.name.$model"  required/>
                        <div v-if="$v.model.name.$anyDirty && $v.model.name.$invalid">
                            <small class="form-text text-danger" v-if="!$v.model.name.required" v-text="$t('entity.validation.required')">
                                This field is required.
                            </small>
                            <small class="form-text text-danger" v-if="!$v.model.name.maxLength" v-bind:value="$t('entity.validation.maxlength')">
                                This field cannot be longer than 30 characters.
                            </small>
                        </div>
                    </div>
                </div>
                <div>
                    <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
                        <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.cancel')">Cancel</span>
                    </button>
                    <button type="submit" id="save-entity" :disabled="$v.model.$invalid || isSaving" class="btn btn-primary">
                        <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./model-update.component.ts">
</script>
