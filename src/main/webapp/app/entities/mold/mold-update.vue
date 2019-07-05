<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id="workshopSilverApp.mold.home.createOrEditLabel" v-text="$t('workshopSilverApp.mold.home.createOrEditLabel')">Create or edit a Mold</h2>
                <div>
                    <div class="form-group" v-if="mold.id">
                        <label for="id" v-text="$t('global.field.id')">ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="mold.id" readonly />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('workshopSilverApp.mold.number')" for="mold-number">Number</label>
                        <input type="text" class="form-control" name="number" id="mold-number"
                            :class="{'valid': !$v.mold.number.$invalid, 'invalid': $v.mold.number.$invalid }" v-model="$v.mold.number.$model"  required/>
                        <div v-if="$v.mold.number.$anyDirty && $v.mold.number.$invalid">
                            <small class="form-text text-danger" v-if="!$v.mold.number.required" v-text="$t('entity.validation.required')">
                                This field is required.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('workshopSilverApp.mold.size')" for="mold-size">Size</label>
                        <select class="form-control" name="size" :class="{'valid': !$v.mold.size.$invalid, 'invalid': $v.mold.size.$invalid }" v-model="$v.mold.size.$model" id="mold-size" >
                            <option value="SMALL" v-bind:label="$t('workshopSilverApp.SizeModel.SMALL')">SMALL</option>
                            <option value="MEDIUM" v-bind:label="$t('workshopSilverApp.SizeModel.MEDIUM')">MEDIUM</option>
                            <option value="LARGE" v-bind:label="$t('workshopSilverApp.SizeModel.LARGE')">LARGE</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label v-text="$t('workshopSilverApp.mold.models')" for="mold-models">Models</label>
                        <select class="form-control" id="mold-models" multiple name="models" v-model="mold.models">
                            <option v-bind:value="getSelected(mold.models, modelOption)" v-for="modelOption in models" :key="modelOption.id">{{modelOption.name}}</option>
                        </select>
                    </div>
                </div>
                <div>
                    <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
                        <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.cancel')">Cancel</span>
                    </button>
                    <button type="submit" id="save-entity" :disabled="$v.mold.$invalid || isSaving" class="btn btn-primary">
                        <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./mold-update.component.ts">
</script>
