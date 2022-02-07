<template>
  <div id="home" class="p-4 md:p-8">
    <div class="minted-harmonyWhales py-16 flex flex-wrap" v-if="harmonyWhales.length < (showMax - (showMin - 1))">
      <div class="text-center">
        <h1 class="text-xl">
          Grabbing all whales
        </h1>
      </div>
    </div>
    <div class="minted-harmonyWhales py-16 flex flex-wrap" v-else>
      <div class="w-full text-center mx-auto">
        <router-link class="px-1" :to="{ name: 'gallery', query: { page: currentPage - 1 } }" v-if="currentPage > 1">
          <i class="fas fa-chevron-left"></i>
        </router-link>

        <div class="inline" v-if="currentPage > 5">
          ...
        </div>

        <div class="inline" :key="`page-top-${page}`" v-for="page in pages">
          <router-link class="text-lg px-1" :to="{ name: 'gallery', query: { page: page } }"
                       v-if="page > (currentPage - 5) && page < (currentPage + 5)">
            {{ page }}
          </router-link>
        </div>

        <div class="inline" v-if="currentPage < pages && pages > 5">
          ...
        </div>

        <router-link class="px-1" :to="{ name: 'gallery', query: { page: currentPage + 1 } }"
                     v-if="currentPage < pages">
          <i class="fas fa-chevron-right"></i>
        </router-link>
      </div>

      <div class="w-full lg:w-1/2 xl:w-1/3 2xl:w-1/4" :key="harmonyWhale.tokenId" v-for="harmonyWhale in harmonyWhales">
        <div class="p-2">
          <img v-lazy="harmonyWhale.image" alt="HarmonyWhale image">
          <p class="py-3 text-xl">
            {{ harmonyWhale.name }} <br>
            <small>Token ID: {{ harmonyWhale.tokenId }}</small>
          </p>
          <div class="py-2">
            <div class="flex" :key="harmonyWhale.tokenId + attribute.trait_type" v-for="attribute in harmonyWhale.attributes">
              <strong class="w-4/12">{{ attribute.trait_type }}: </strong>
              <span class="w-8/12">{{ attribute.value }} ({{ attributes[attribute.trait_type][attribute.value] }})</span>
            </div>
          </div>
        </div>
      </div>

      <div class="w-full text-center mx-auto">
        <router-link class="px-1" :to="{ name: 'gallery', query: { page: currentPage - 1 } }" v-if="currentPage > 1">
          <i class="fas fa-chevron-left"></i>
        </router-link>

        <div class="inline" v-if="currentPage > 5">
          ...
        </div>

        <div class="inline" :key="`page-bot-${page}`" v-for="page in pages">
          <router-link class="text-lg px-1" :to="{ name: 'gallery', query: { page: page } }"
                       v-if="page > (currentPage - 5) && page < (currentPage + 5)">
            {{ page }}
          </router-link>
        </div>

        <div class="inline" v-if="currentPage < pages && pages > 5">
          ...
        </div>

        <router-link class="px-1" :to="{ name: 'gallery', query: { page: currentPage + 1 } }"
                     v-if="currentPage < pages">
          <i class="fas fa-chevron-right"></i>
        </router-link>
      </div>
    </div>

  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import abi from '../plugins/abi/CRYPTOPIGS.json'
import metamask from '../plugins/metamask'
import axios from 'axios'

export default {
  name: 'AllHarmonyWhales',
  mixins: [metamask],
  computed: {
    ...mapGetters(['walletAddress', 'harmonyWhaleContractAddress', 'wallet'])
  },
  data() {
    return {
      loading: true,
      harmonyWhales: [],
      currentPage: 1,
      allPages: 100,
      pages: 1,
      showMin: 0,
      showMax: 0,
      attributes: {
        "Background": {
          "Fuchsia": "12.58%",
          "Bronzed": "11.38%",
          "Hoary": "13.11%",
          "Navy": "11.82%",
          "Dark Gray": "11.20%",
          "Dark Emerald": "13.20%",
          "Emerald": "12.00%",
          "Red": "11.29%",
          "Space": "1.24%",
          "Rainbow": "1.11%",
          "Ocean": "1.07%",
        },
        "Body": {
          "Lime": "9.73%",
          "Pitch": "0.89%",
          "Royal": "8.93%",
          "Green": "9.56%",
          "Turquoise": "9.91%",
          "Blue": "9.60%",
          "Gray": "9.82%",
          "Purple": "9.87%",
          "Pink": "9.56%",
          "Melon": "9.56%",
          "Orange": "9.47%",
          "Black": "3.11%",
        },
        "Eyes": {
          "Shiny Lime": "6.36%",
          "Yellow (Mirrored)": "6.40%",
          "Pink (Mirrored)": "6.80%",
          "Brown": "9.33%",
          "Shiny Green": "9.51%",
          "Purple": "9.60%",
          "Green": "10.58%",
          "Pink": "10.49%",
          "Yellow": "10.84%",
          "Round Black": "11.29%",
          "Blue": "8.80%",
        },
        "Mouth": {
          "Closed (Mirrored)": "9.56%",
          "Open No Teeth (Mirrored)": "10.00%",
          "Two Teeth Open": "9.60%",
          "Closed": "10.00%",
          "Open No Teeth": "9.64%",
          "Open Tongue": "9.78%",
          "Shark": "11.02%",
          "Open One Teeth": "9.82%",
          "Open Two Sharp Teeth": "10.44%",
          "Closed Tongue": "10.13%",
        },
        "Eyebrows": {
          "Bold (Mirrored)": "9.69%",
          "White (Mirrored)": "9.87%",
          "Sleepy": "9.33%",
          "Curious": "8.62%",
          "Suspicious": "8.71%",
          "Bold": "8.67%",
          "Thoughtful": "8.58%",
          "European": "9.56%",
          "Smirky": "9.87%",
          "Confused": "8.53%",
          "White": "8.58%",
        },
        "Accessories": {
          "Unicorn (Mirrored)": "1.96%",
          "Angel Wing (Mirrored)": "8.76%",
          "Headphones (Mirrored)": "8.84%",
          "Unicorn": "2.18%",
          "Bitcoin": "13.73%",
          "Pearls": "13.64%",
          "Angel Wing": "5.69%",
          "Horns": "11.47%",
          "Glasses": "14.67%",
          "Headphones": "5.02%",
          "Ears": "14.04%",
        },
        "Hair": {
          "Mohawk White (Mirrored)": "10.13%",
          "Mohawk (Mirrored)": "9.42%",
          "Curly": "9.60%",
          "Mohawk": "10.40%",
          "Busy": "9.69%",
          "Wavy": "10.53%",
          "Sprout": "11.47%",
          "Combed": "9.69%",
          "Hairdo": "9.87%",
          "Tornado": "9.20%",
        }
      }
    }
  },
  watch: {
    $route() {
      this.loading = true
      this.harmonyWhales = []

      if (this.$route.query.page) {
        this.currentPage = this.$route.query.page
      }

      this.getAllHarmonyWhales()
    }
  },
  mounted() {
    this.loading = true
    this.harmonyWhales = []

    if (this.$route.query.page) {
      this.currentPage = this.$route.query.page
    }

    this.getAllHarmonyWhales()
  },
  methods: {
    difference(n, m) {
      return Math.abs(n - m)
    },
    range(start, end, step = 1) {
      let range = [];
      let typeofStart = typeof start;
      let typeofEnd = typeof end;

      if (step === 0) {
        throw TypeError("Step cannot be zero.");
      }

      if (typeofStart === "undefined" || typeofEnd === "undefined") {
        throw TypeError("Must pass start and end arguments.");
      } else if (typeofStart !== typeofEnd) {
        throw TypeError("Start and end arguments must be of same type.");
      }

      typeof step == "undefined" && (step = 1);

      if (end < start) {
        step = -step;
      }

      if (typeofStart === "number") {

        while (step > 0 ? end >= start : end <= start) {
          range.push(start);
          start += step;
        }

      } else if (typeofStart === "string") {

        if (start.length !== 1 || end.length !== 1) {
          throw TypeError("Only strings with one character are supported.");
        }

        start = start.charCodeAt(0);
        end = end.charCodeAt(0);

        while (step > 0 ? end >= start : end <= start) {
          range.push(String.fromCharCode(start));
          start += step;
        }

      } else {
        throw TypeError("Only string and number types are supported");
      }

      return range
    },
    async getAllHarmonyWhales() {
      const Web3 = require('web3');
      const web3 = new Web3(new Web3.providers.HttpProvider('https://api.s0.t.hmny.io/'));

      const contract = new web3.eth.Contract(abi, this.harmonyWhaleContractAddress);
      const amountOfHarmonyWhalesMinted = await contract.methods.totalSupply().call();

      this.pages = Math.ceil(amountOfHarmonyWhalesMinted / 50)

      if (this.currentPage > this.pages) {
        window.location.href = '/'
      } else {
        const tags = await axios.get(`https://api.harmonywhales.com/meta/fromto?page=${this.currentPage}`)
        this.harmonyWhales = tags.data

        this.loading = false
      }
    }
  },
  filters: {
    compressAddress(address) {
      if (address !== undefined) {
        return (
            address.substr(0, 10) +
            "..." +
            address.substr(address.length - 5, address.length)
        )
      }
    },
    formatNumber(nStr) {
      nStr += ''
      let x = nStr.split('.')
      let x1 = x[0]
      let x2 = x.length > 1 ? '.' + x[1] : ''
      let rgx = /(\d+)(\d{3})/
      while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2')
      }
      return x1 + x2
    }
  }
}
</script>