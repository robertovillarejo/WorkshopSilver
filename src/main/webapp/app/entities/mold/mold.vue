<template>
    <div>
        <h2 id="page-heading">
            <span v-text="$t('workshopSilverApp.mold.home.title')" id="mold-heading">Molds</span>
            <router-link :to="{name: 'MoldCreate'}" tag="button" id="jh-create-entity" class="btn btn-primary float-right jh-create-entity create-mold">
                <font-awesome-icon icon="plus"></font-awesome-icon>
                <span  v-text="$t('workshopSilverApp.mold.home.createLabel')">
                    Create new Mold
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
        <div class="alert alert-warning" v-if="!isFetching && molds && molds.length === 0">
            <span v-text="$t('workshopSilverApp.mold.home.notFound')">No molds found</span>
        </div>
        <div class="table-responsive" v-if="molds && molds.length > 0">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th v-on:click="changeOrder('number')"><span v-text="$t('workshopSilverApp.mold.number')">Number</span> <font-awesome-icon icon="sort"></font-awesome-icon></th>
                    <th v-on:click="changeOrder('size')"><span v-text="$t('workshopSilverApp.mold.size')">Size</span> <font-awesome-icon icon="sort"></font-awesome-icon></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="mold of orderBy(molds, propOrder, reverse === true ? 1 : -1)"
                    :key="mold.id">
                    <td>
                        <router-link :to="{name: 'MoldView', params: {moldId: mold.id}}">{{mold.number}}</router-link>
                    </td>
                    <td v-text="$t('workshopSilverApp.SizeModel.' + mold.size)">{{mold.size}}</td>
                    <td class="text-right">
                        <div class="btn-group flex-btn-group-container">
                            <router-link :to="{name: 'MoldView', params: {moldId: mold.id}}" tag="button" class="btn btn-info btn-sm details">
                                <font-awesome-icon icon="eye"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                            </router-link>
                            <router-link :to="{name: 'MoldEdit', params: {moldId: mold.id}}"  tag="button" class="btn btn-primary btn-sm edit">
                                <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>
                            </router-link>
                            <b-button v-on:click="prepareRemove(mold)"
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
            <span slot="modal-title"><span id="workshopSilverApp.mold.delete.question" v-text="$t('entity.delete.title')">Confirm delete operation</span></span>
            <div class="modal-body">
                <p id="jhi-delete-mold-heading" v-bind:title="$t('workshopSilverApp.mold.delete.question')">Are you sure you want to delete this Mold?</p>
            </div>
            <div slot="modal-footer">
                <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
                <button type="button" class="btn btn-primary" id="jhi-confirm-delete-mold" v-text="$t('entity.action.delete')" v-on:click="removeMold()">Delete</button>
            </div>
        </b-modal>
        <div v-if="molds && molds.length">
            <div class="row justify-content-center">
                <jhi-item-count :page="page" :total="queryCount" :itemsPerPage="itemsPerPage"></jhi-item-count>
            </div>
            <div class="row justify-content-center">
                <b-pagination size="md" :total-rows="totalItems" v-model="page" :per-page="itemsPerPage" :change="loadPage(page)"></b-pagination>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./mold.component.ts">
</script>
