<template>
  <el-container style="height: 500px; border: 1px solid #eee">
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
        <el-input placeholder="请输入城市"  prefix-icon="el-icon-search"></el-input>
      </el-row>
      <div style="padding-top:10px">
        <el-checkbox-group v-model="checkCityList" size="mini">
          <el-checkbox-button
            v-for="item in cityList"
            :key="item.name"
            :label="item"
            size="mini"
            @change="((val)=>{checkCityChange(val, item.name)})"
          >{{item.name}}</el-checkbox-button>
        </el-checkbox-group>
      </div>
    </el-aside>
    <el-main  >
      <e-china-and-city :geoCoordMapCheck="checkCityList" @clickProvince="getProvince"></e-china-and-city>
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
      }
    };
  },
  components: {
    EChinaAndCity
  },
  methods: {
    //根据子组件传递过来的省份,加载改省份的城市
    getProvince(val) {
      this.loadingAside = true;
      this.province = val;
      this.geoCoordMap.map(item => {
        if (item.name === val) {
          //this.sortByKey(Jitem.children,'name');
          //如果这么赋值,如果citylist修改属性 geocoordmap也会联动修改 所以需要加JSon转换
          this.cityList = this.sortByKey(
            JSON.parse(JSON.stringify(item.children)),
            "name"
          );

        }
      });
      this.cityList.forEach(item => {
        item.value = 1;
        item.province=val;
      });
      this.loadingAside = false;
    //  console.log('省份加载城市列表',this.cityList,this.geoCoordMap);
    },
    checkCityChange(value,cityname) {
      console.log("checkCityChange",this.checkCityList,cityname);
      // this.SelectProvinceList.map(item=>{
      //
      // });
    },
    //数组对象方法排序:
    sortByKey(array, key) {
      return array.sort(function(a, b) {
        var x = a[key];
        var y = b[key];
        return x < y ? -1 : x > y ? 1 : 0;
      });
    }
  },
  mounted() {
    this.$axios.get("geoCoordMap.json", {}).then(res => {
      this.geoCoordMap = res.data;
      // console.log('加载城市经纬度',this.geoCoordMap)
    });
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
