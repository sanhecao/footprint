<template>
  <el-container style="height: 500px; border: 1px solid #eee" v-loading.fullscreen.lock="fullscreenLoading">
    <el-aside v-loading="loadingAside"  width="300px">
      <el-row type="flex" style=" box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)" >
        <el-col :span="3">
        <el-button  size="mini" icon="el-icon-edit" circle :disabled="false"></el-button>
        </el-col>
        <el-col :span="21">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item style="padding:10px 0">{{province}}</el-breadcrumb-item>
        </el-breadcrumb>
        </el-col>

      </el-row>
      <el-row style=" box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)">
        <el-input placeholder="请输入城市" v-model="inputCity"
                  prefix-icon="el-icon-search"
                  clearable
                  @change="searchCity(inputCity)"
        ></el-input>
      </el-row>
      <div style="padding-top:10px">
<!--        <el-checkbox-group v-model="checkCityList" size="mini"  @change="handleCheckedCitiesChange">-->
          <el-checkbox-button
            v-for="item in cityList"
            :key="item.name"
            :label="item"
            size="mini"
            :checked="indexOf(item,checkCityList)"
            @change="handleCheckedCitiesChange(item,indexOf(item,checkCityList))"
          >{{item.name}}</el-checkbox-button>
<!--        </el-checkbox-group>-->
      </div>
    </el-aside>
    <el-main  >
      <e-china-and-city :geoCoordMapCheck="checkCityList" @clickProvince="getCityByProvince" ></e-china-and-city>
    </el-main>
  </el-container>
</template>

<script>
import EChinaAndCity from "../components/EChinaAndCity";
export default {
  name: "MapCountryCity",
  data() {
    return {
      province: "点击地图上的省份选择城市",
      geoCoordMap: [],
      cityList: [],
      checkCityList: [], //选择的城市
      loadingMain: false,
      loadingAside:false,
      //某个省份下勾选的城市列表
      SelectProvinceList:{
        ProvinceName:'',
        cityList:[]
      },
      inputCity:'',//搜索城市
      fullscreenLoading:false
    };
  },
  created(){
     this.fullscreenLoading=true;
  },
  computed:{
    //计算属性,切换省 如果城市已经勾选过了,需要在高亮显示
    IsCheckCity() {
      return function(CityName){
        let index =this.checkCityList.findIndex(item => item.name === CityName);
      if(index > -1) {
        return true;
      } else {
        return false;
      }
    }
    }
  },
  components: {
    EChinaAndCity
  },
  methods: {
    //根据子组件传递过来的省份,加载改省份的城市
    getCityByProvince(val) {
      this.loadingAside = true;
      if(this.province !== val) {
        this.province = val;
        let that=this;
        this.geoCoordMap.map(item => {
          if (item.name === val) {
            //如果这么赋值,如果citylist修改属性 geocoordmap也会联动修改 所以需要加JSon转换
            that.cityList = that.sortByKey(
                    JSON.parse(JSON.stringify(item.children)),
                    "name"
            );
           // console.log('获取排序后的城市',that.cityList);
          }
        });
      };
      var tempItem={};
      let that=this;
     // console.log('citylist',this.cityList)

      this.cityList.forEach(item => {
        that.$set(item, 'checked', that.indexOf(item,that.checkCityList));
        that.$set(item, 'value', 1);
        that.$set(item, 'province', val);
         if(that.inputCity && item.name === that.inputCity) {
        //  // item.checked = true;
        //  // console.log('checkCityList',this.checkCityList);
            tempItem = item;}
        //   if (that.checkCityList.findIndex(citem => citem.name === tempItem.name) <= -1) {
        //   //  console.log('插入', this.checkCityList, this.inputCity, this.checkCityList.findIndex(citem => citem.name === this.inputCity));
        //     that.checkCityList.push({
        //       name: tempItem.name,
        //       lat: tempItem.lat,
        //       log: tempItem.log,
        //       value: 1,
        //       province: tempItem.province,
        //       checked: false
        //     });
        //   }
        // }
      });
      if(!this.indexOf(tempItem,this.checkCityList)){
      this.handleCheckedCitiesChange(tempItem,this.indexOf(tempItem,this.checkCityList));
      }
      this.loadingAside = false;
     // console.log('省份加载城市列表',this.cityList,this.checkCityList);
    },
    indexOf(item, items) {
     // console.log('indexOf',items.indexOf(item))
      items = JSON.stringify(items)
      item = JSON.stringify(item)
      if(items.indexOf(item) > -1 ){
        return true
      }else{
        return false
      }
    },
    handleCheckedCitiesChange(e,ischeck) {
      console.log('handleCheckedCitiesChange',e,ischeck)
      if(ischeck){
        this.checkCityList.forEach((item, index, array) => {
          if (e.name == item.name) {
            this.checkCityList.splice(index, 1)
          }
        })
      }else{
        this.checkCityList.push(e)
      }
      console.log('勾选城市 ' ,e,this.cityList,this.checkCityList)
    },
    searchCity(City){
      //得到改城市的所在省份
      if(City) {
        var searcheProvince = this.getProviceByCity(City);//根据城市查到省份
        this.getCityByProvince(searcheProvince.province);
        //let index = this.cityList.findIndex(citem => citem.name === City);
        //this.cityList[index].checked = true;
        //console.log("searchCity111",this.checkCityList,this.cityList);

        this.inputCity = '';
      }
    },
    getProviceByCity(cityName){
      var proviceName={};
      this.geoCoordMap.map(item => {
        if (item.name === cityName) {
          proviceName.province= item.name;
          proviceName.checked= true;
          proviceName.lat= item.lat;
          proviceName.log=item.log;
          proviceName.name=cityName;
          proviceName.value= 1
        } else {
          item.children.map(itemChild => {
            if (itemChild.name === cityName) {
              proviceName.province= item.name;
              proviceName.checked= true;
              proviceName.lat= itemChild.lat;
              proviceName.log=itemChild.log;
              proviceName.name=cityName;
              proviceName.value= 1
            }
          })
        }
      });
      return proviceName;
    },
    //数组对象方法排序:
    sortByKey(array, key) {
      return array.sort(function(a, b) {
         var x = a[key];
         var y = b[key];
        return x.localeCompare(y,"zh");//按中文排序
      });
    }
  },
  mounted() {
    this.$axios.get("./geoCoordMap.json", {}).then(res => {
      this.geoCoordMap = res.data;
      this.fullscreenLoading=false;
      // console.log('加载城市经纬度',this.geoCoordMap)
    });
   // this.$axios.post("http://printtag.focusmedia.tech/printtag/isValidUser?UserId=E0025344&Password=l123456789", {}).then(res => {
    //  console.log(res);
      // console.log('加载城市经纬度',this.geoCoordMap)
   // });
  }
};
</script>
<style>
.el-aside {
  background-color: #fff;
  color: rgb(14, 121, 221);
  text-align: left;
  line-height: 30px;
}
.el-main {
  background-color: #fff;
  color: rgb(14, 121, 221);
  padding: 0;
}
</style>
