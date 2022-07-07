<template>
  <div class="container mt-5">
    <div>
      <b-modal id="modal-1" title="Country Details">
        <p class="my-4">{{selectedItem.Capital}}</p>
      </b-modal>
    </div>

    <table class="table table-striped table-hover">
        <thead>
          <tr>
            
            <th>Flags</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="flag in resultQuery" v-bind:key="flag.id">           
            <td >
                <b-button v-b-modal  :value=flag.CountryName>
                    <img :src="flag.ImageUrl"  @click="getCountry(flag.CountryName)"  alt="Country Flag" width="60px" height="30px" />
                </b-button>                                              
            </td>           
          </tr>
        </tbody>
      </table>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>
