<template>
  <div class="container-center">
    <div class="card">
      <input
        @change="toggleTheme()"
        id="checkbox"
        type="checkbox"
        class="switch-checkbox"
      />
      <label for="checkbox" class="switch-label">
        <!--<span>🌙</span>
        <span>☀️</span>-->
        <div
          class="switch-toggle"
          :class="{ 'switch-toggle-checked': userTheme === 'dark-theme' }"
        ></div>
      </label> 
      <br />
      <div class="row">
            <div class="search-wrapper panel-heading col-sm-12">
                <input class="form-control" type="text" v-model="searchQuery" placeholder="Search" />
          </div>                        
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
      <b-modal id="modal-1" title="Country Details">
            <p class="my-4"><b>Country: </b>{{selectedItem.Name}}</p>
            <p class="my-4"><b>Capital: </b>{{selectedItem.Capital}}</p>
            <p class="my-4"><b>Population: </b>{{selectedItem.Population}}</p>
        </b-modal>
    </div>    
  </div>
</template>

<script>
import axios from "axios";

export default {
  mounted() {
    const initUserTheme = this.getMediaPreference();
    this.setTheme(initUserTheme);
  },

  components: {

  },

  data() {
    return {
      userTheme: "light-theme",
      flags: [],
      cntry: null,
      CountryDetails:[],
      selectedItem: {},
      searchQuery: null,
    };
  },
  
  methods: {
    setTheme(theme) {
      localStorage.setItem("user-theme", theme);
      this.userTheme = theme;
      document.documentElement.className = theme;
    },

    selectItem(item) {
      this.selectedItem = item
      //this.showModal = true
      this.$bvModal.show('modal-1')
    },
    toggleTheme() {
      console.log("Theme toggle");
      const activeTheme = localStorage.getItem("user-theme");
      if (activeTheme === "light-theme") {
        this.setTheme("dark-theme");
      } else {
        this.setTheme("light-theme");
      }
    },

    async getFlags() {
      try {
        const response = await axios.get("http://localhost:34977/api/flag");
        // JSON responses are automatically parsed.
        this.flags = response.data.CountryFlag;
        console.log(this.flags);
      } catch (error) {
        console.log(error);
      }
    },

    async getCountry(country){
        
        localStorage.setItem("country", country);
        this.cntry = localStorage.getItem("country");
        console.log(localStorage.getItem("country"));

        try{
            const response = await axios.get("http://localhost:34977/api/countrydetails" +"/country/" + this.cntry);
            this.CountryDetails = response.data.CountryDetails;

            this.selectItem(this.CountryDetails)
            //this.$bvModal.show('modal-1')
            //$('#modal-1').modal('show')
            console.log(this.CountryDetails);
        }catch(error) {
            console.log(error);
        }
    }
  },

  getMediaPreference() {
    const hasDarkPreference = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    if (hasDarkPreference) {
      return "dark-theme";
    } else {
      return "light-theme";
    }
  },

  created() {
    this.getFlags();
    
  },

  computed: {
    resultQuery(){
      if(this.searchQuery){
      return this.flags.filter((flag)=>{
        return this.searchQuery.toLowerCase().split(' ').every(v => flag.CountryName.toLowerCase().includes(v))
      })
      }else{
        return this.flags;
      }
    }
  }
};
</script>

<style>
html,
body {
  padding: 0;
  margin: 0;
}
/* Define styles for the default root window element */
:root {
  --background-color-primary: #ebebeb;
  --background-color-secondary: #fafafa;
  --accent-color: #cacaca;
  --text-primary-color: #222;
  --element-size: 4rem;
}

/* Define styles for the root window with dark - mode preference */
:root.dark-theme {
  --background-color-primary: #1e1e1e;
  --background-color-secondary: #2d2d30;
  --accent-color: #3f3f3f;
  --text-primary-color: #ddd;
}

p {
  color: black;
}

.container-center {
  background-color: var(--background-color-primary); 
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
}

.card {
  padding: 2rem 4rem;
  width: 500px;
  text-align: center;
  border: 1px solid var(--accent-color);
  border-radius: 4px;
  background-color: var(--background-color-secondary);
}

.switch-checkbox {
  display: none;
}

:root {
  --background-color-primary: #ebebeb;
  --background-color-secondary: #fafafa;
  --accent-color: #cacaca;
  --text-primary-color: #222;
  --element-size: 4rem; /* <- this is the base size of our element */
}

.switch-label {
  /* for width, use the standard element-size */
  width: var(--element-size);

  /* for other dimensions, calculate values based on it */
  border-radius: var(--element-size);
  border: calc(var(--element-size) * 0.025) solid var(--accent-color);
  padding: calc(var(--element-size) * 0.1);
  font-size: calc(var(--element-size) * 0.3);
  height: calc(var(--element-size) * 0.35);

  align-items: center;
  background: var(--text-primary-color);
  cursor: pointer;
  display: flex;
  position: relative;
  transition: background 0.5s ease;
  justify-content: space-between;
  z-index: 1;
}

.switch-toggle {
  position: absolute;
  background-color: var(--background-color-primary);
  border-radius: 50%;
  top: -3px;
  left: -3px;
  height: calc(var(--element-size) * 0.4);
  width: calc(var(--element-size) * 0.43);
  transform: translateX(0);
  transition: transform 0.3s ease, background-color 0.5s ease;
}

.switch-togglese {
  position: absolute;
  background-color: var(--background-color-primary);
  border-radius: 50%;
  top: calc(var(--element-size) * 0.07);
  left: calc(var(--element-size) * 0.07);
  height: calc(var(--element-size) * 0.4);
  width: calc(var(--element-size) * 0.4);
  transform: translateX(0);
  transition: transform 0.3s ease, background-color 0.5s ease;
}

.switch-toggle-checked {
  transform: translateX(calc(var(--element-size) * 0.6)) !important;
}

table {
  font-family: "Open Sans", sans-serif;
  width: 500px;
  border-collapse: collapse;
  border: 3px solid #44475c;
  margin: 50px 0 0 0px;
  padding: 50px;
}

table th {
  text-transform: uppercase;
  text-align: left;
  background: #44475c;
  color: #fff;
  cursor: pointer;
  padding: 8px;
  //min-width: 150px;
  align: center;
}
table th:hover {
  background: #717699;
}

table td {
  text-align: left;
  padding: 8px;
  border-right: 2px solid #7d82a8;
}
table td:last-child {
  border-right: none;
}
table tbody tr:nth-child(2n) td {
  background: #d4d8f9;
}
</style>
