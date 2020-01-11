<template>
  <div class="echarts">
    <div v-for="item in geoCoordMapCheck" :key="item.name">{{item.name}}</div>
    <div :style="{height:'500px',width:'100%'}" ref="myEchart"></div>
  </div>
</template>

<script>
import echarts from "echarts";

//  import '../../node_modules/echarts/map/js/china.js'
import chinaJson from "../../node_modules/echarts/map/json/china.json";
// import xinjiangJson from '../../node_modules/echarts/map/json/province/xinjiang.json'
import { yellow } from "color-name";
export default {
  name: "EChinaAndCity",
  props: {
    geoCoordMapCheck: Array
  },
  watch: {
    geoCoordMapCheck: {
      handler() {
        console.log("勾选了城市", this.geoCoordMapCheck);
      //  this.defaultOpt.data=this.lableData1;
       // this.resetOption(this.myChart, this.mapOption, 'china');
        this.myChart.series[0].data=this.initSeriesData(this.lableData1);
      }
    }
  },
  data() {
    return {
      geoCoordMap: {
        北京: [116.4551, 40.2539],
        青海: [96.2402, 35.4199],
     
        上默特右旗:[110.52,40.55]
      },
      curGeoJson: {},
      cityMap: {
        中国: chinaJson,
        新疆: "map/data-xinjiang.json",
        上海: "map/data-shanghai.json",
        河北: "map/data-hebei.json",
        山西: "map/data-shangxi.json",
        内蒙古: "map/data-neimenggu.json",
        辽宁: "map/data-liaoning.json",
        吉林: "map/data-jilin.json",
        黑龙江: "map/data-heilongjiang.json",
        江苏: "map/data-jiangsu.json",
        浙江: "map/data-zhejiang.json",
        安徽: "map/data-anhui.json",
        福建: "map/data-fujian.json",
        江西: "map/data-jiangxi.json",
        山东: "map/data-shangdong.json",
        河南: "map/data-henan.json",
        湖北: "map/data-hubei.json",
        湖南: "map/data-hunan.json",
        广东: "map/data-guangdong.json",
        广西: "map/data-guangxi.json",
        海南: "map/data-hainan.json",
        四川: "map/data-sichuan.json",
        贵州: "map/data-guizhou.json",
        云南: "map/data-yunnan.json",
        西藏: "map/data-xizang.json",
        陕西: "map/data-shanxi.json",
        甘肃: "map/data-gansu.json",
        青海: "map/data-qinghai.json",
        宁夏: "map/data-ningxia.json",
        北京: "map/data-beijing.json",
        天津: "map/data-tianjin.json",
        重庆: "map/data-chongqing.json",
        香港: "map/data-xianggang.json",
        澳门: "map/data-aomen.json"
      },
      // levelColorMap : {
      //     '1': 'rgba(241, 109, 115, .8)',
      //     '2': 'rgba(255, 235, 59, .7)',
      //     '3': 'rgba(147, 235, 248, 1)'
      // },
      styleDef: {
        font: '18px "Microsoft YaHei", sans-serif',
        textColor: "#eee",
        lineColor: "rgba(147, 235, 248, .8)"
      },
      posDef: {
        leftPlus: 115,
        leftCur: 150,
        left: 198,
        top: 50
      },
      mapName: ["china"],
      idx: 0,
      lineDef: [[0, 0], [8, 11], [0, 22]],
      myChart: {},
      mapOption: {},
      defaultOpt: {
        mapName: "中国", // 地图展示
        goDown: false, // 是否下钻
        bgColor: "#154e90", // 画布背景色
        activeArea: [], // 区域高亮,同echarts配置项
        data: [],
        // 下钻回调(点击的地图名、实例对象option、实例对象)
        callback: function(name, option, instance) {}
      },
      footPrintData: [],
      lableData: [
        {
          name: "北京",
          value: 1
        },
        
        {
          name: "南海诸岛",
          value: 1
        }
      ],
      lableData1:[
           {
          name: "上海",
          value: 1
        }
      ]
    };
  },
  mounted() {
    this.chinaConfigure();
  },
  methods: {
    chinaConfigure() {
      // axios.get('map/data-china.json',{}).then(res=>{
      //     echarts.registerMap('中国', res.data);
      // })
      echarts.registerMap("china", chinaJson);
      this.myChart = echarts.init(this.$refs.myEchart);
      console.log("chinaConfigure", this.myChart);
      // echarts.registerMap('中国', '../../node_modules/echarts/map/json/china.json');
      //  console.log('chinaConfigure',this.myChart);
      var _this = this;
      this.mapOption = {
        backgroundColor: this.defaultOpt.bgColor,
        tooltip: {
          show: true,
          trigger: "item",
          alwaysShowContent: false,
          backgroundColor: "rgba(50,50,50,0.7)",
          hideDelay: 100,
          triggerOn: "mousemove",
          enterable: true,
          position: ["60%", "70%"]
          //hqp formatter:function(params, ticket, callback){
          //     return '简称：'+params.data.name+'<br/>'+'机组：'+params.data.crew+'万千瓦'+'<br/>'+'公司名称：'+params.data.company+'<br/>'+'所属大区：'+params.data.region+'<br/>'+'所在位置：'+params.data.position
          // }
        },
        //图例 控制每个省显示的颜色.显示一个颜色,有值就会显示
        visualMap: {
          min: 0,
          max: 1,
          left: "left",
          top: "bottom",
          text: ["高", "低"],
          show: false,
          seriesIndex: 1,
          inRange: {
            color: ["red"]
          }
        },
        //绘制标题
        graphic: [
          {
            type: "group",
            left: _this.posDef.left,
            top: _this.posDef.top - 4,
            children: [
              {
                type: "line",
                left: 0,
                top: -20,
                shape: {
                  x1: 0,
                  y1: 0,
                  x2: 60,
                  y2: 0
                },
                style: {
                  stroke: _this.styleDef.lineColor
                }
              },
              {
                type: "line",
                left: 0,
                top: 20,
                shape: {
                  x1: 0,
                  y1: 0,
                  x2: 60,
                  y2: 0
                },
                style: {
                  stroke: _this.styleDef.lineColor
                }
              }
            ]
          },
          {
            id: _this.mapName[_this.idx],
            type: "group",
            left: _this.posDef.left + 2,
            top: _this.posDef.top,
            children: [
              {
                type: "polyline",
                left: 90,
                top: -12,
                shape: {
                  points: _this.lineDef
                },
                style: {
                  stroke: "transparent",
                  key: _this.mapName[0]
                },
                onclick: function() {
                  var name = this.style.key;
                  _this.resetOption(_this.myChart, _this.mapOption, name);
                }
              },
              {
                type: "text",
                left: 0,
                top: "middle",
                style: {
                  text: "中国",
                  textAlign: "center",
                  fill: _this.styleDef.textColor,
                  font: _this.styleDef.font
                },
                onclick: function() {
                  _this.resetOption(_this.myChart, _this.mapOption, "中国");
                }
              },
              {
                type: "text",
                left: 0,
                top: 10,
                style: {
                  text: "China",
                  textAlign: "center",
                  fill: _this.styleDef.textColor,
                  font: '12px "Microsoft YaHei", sans-serif'
                },
                onclick: function() {
                  _this.resetOption(_this.myChart, _this.mapOption, "中国");
                }
              }
            ]
          }
        ],

        geo: {
          map: _this.mapName[0],
          roam: true,
          zoom: 1,
          label: {
            normal: {
              show: true,
              textStyle: {
                color: "#fff"
              }
            },
            emphasis: {
              textStyle: {
                color: "#fff"
              }
            }
          },
          itemStyle: {
            normal: {
              borderColor: "rgba(147, 235, 248, 1)",
              borderWidth: 1,
              areaColor: {
                type: "radial",
                x: 0.5,
                y: 0.5,
                r: 0.8,
                colorStops: [
                  {
                    offset: 0,
                    color: "rgba(147, 235, 248, 0)" // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "rgba(147, 235, 248, .2)" // 100% 处的颜色
                  }
                ],
                globalCoord: false // 缺省为 false
              },
              shadowColor: "rgba(128, 217, 248, 1)",
              // shadowColor: 'rgba(255, 255, 255, 1)',
              shadowOffsetX: -2,
              shadowOffsetY: 2,
              shadowBlur: 10
            },
            emphasis: {
              areaColor: "#389BB7",
              borderWidth: 0
            }
          },
          regions: _this.defaultOpt.activeArea.map(function(item) {
            console.log("regions", item);
            if (typeof item !== "string") {
              return {
                name: item.name,
                itemStyle: {
                  normal: {
                    areaColor: item.areaColor || "#389BB7"
                  }
                },
                label: {
                  normal: {
                    show: item.showLabel,
                    textStyle: {
                      color: "#fff"
                    }
                  }
                }
              };
            } else {
              return {
                name: item,
                itemStyle: {
                  normal: {
                    borderColor: "#91e6ff",
                    areaColor: "#389BB7"
                  }
                }
              };
            }
          })
        },
        //绘制图上的点之类的图像,还有浮动数据框显示
        series: [
          {
            type: "effectScatter",
            geoIndex: 0,
            name: "去过的地方",
            coordinateSystem: "geo",
            showEffectOn: "render",
            rippleEffect: {
              period: 15,
              scale: 4,
              brushType: "fill"
            },
            hoverAnimation: true,
            itemStyle: {
              normal: {
                color: "#FFC848",
                shadowBlur: 10,
                shadowColor: "#333"
              }
            },
            //data: _this.initSeriesData(_this.defaultOpt.data)
            //data: _this.lableData
            data: _this.initSeriesData(_this.lableData)
          },
          {
            name: "map",
            type: "map",
            mapType: "china",
            geoIndex: 0,
            label: {
              normal: { show: false },
              emphasis: { show: false }
            },
            data: this.lableData
          }
        ]
      };
      this.myChart.setOption(this.mapOption);
      this.myChart.on("click", function(params) {
        console.log("click", params.name, _this.selectProvince);
        var _self = this;
        _this.$emit("clickProvince", params.name);
        //下砖到省地图
        // if (_this.defaultOpt.goDown && params.name !== _this.mapName[_this.idx]) {
        //     if (_this.cityMap[params.name]) {
        //         var url = _this.cityMap[params.name];
        //        // console.log(url);
        //         axios.get(url,{}).then(res=>{
        //            // console.log(res;
        //             _this.curGeoJson = res;
        //             //console.log('axios.get',_this.curGeoJson );
        //             echarts.registerMap(params.name, res.data);
        //           //  console.log(3 );
        //             _this.resetOption(_self, _this.mapOption, params.name);
        //         });
        //     }
        // }
      });
      this.myChart.setMap = function(mapName) {
        var _self = this;
        if (mapName.indexOf("市") < 0) mapName = mapName + "市";
        var citySource = _this.cityMap[mapName];
        if (citySource) {
          var url = "./map/" + citySource + ".json";
          this.$axios.get(url, {}).then(res => {
            _this.curGeoJson = res;
            echarts.registerMap(mapName, res.data);
            _this.resetOption(_self, this.mapOption, mapName);
          });
        }
      };
      window.onresiza = this.myChart.resize;
    },
    /**
     * i 实例对象
     * o option
     * n 地图名
     **/
    resetOption: function(i, o, n) {
      console.log("resetOption", i, o, n);
      var breadcrumb = this.createBreadcrumb(n);
      var j = this.mapName.indexOf(n);
      var l = o.graphic.length;
      if (j < 0) {
        o.graphic.push(breadcrumb);
        o.graphic[0].children[0].shape.x2 = 145;
        o.graphic[0].children[1].shape.x2 = 145;
        if (o.graphic.length > 2) {
          var cityData = [];
          var cityJson;
          for (var x = 0; x < this.defaultOpt.data.length; x++) {
            if (n === this.defaultOpt.data[x].city) {
              $([this.defaultOpt.data[x]]).each(function(index, data) {
                cityJson = {
                  city: data.city,
                  name: data.name,
                  value: data.value,
                  crew: data.crew,
                  company: data.company,
                  position: data.position,
                  region: data.region
                };
                console.log("resetOption-cityJson", cityJson);
                cityData.push(cityJson);
              });
            }
          }

          if (cityData !== null) {
            o.series[0].data = this.initSeriesData(cityData);
          } else {
            o.series[0].data = [];
          }
        }
        this.mapName.push(n);
        this.idx++;
      } else {
        o.graphic.splice(j + 2, l);
        if (o.graphic.length <= 2) {
          o.graphic[0].children[0].shape.x2 = 60;
          o.graphic[0].children[1].shape.x2 = 60;
          o.series[0].data = this.initSeriesData(this.defaultOpt.data);
        }
        this.mapName.splice(j + 1, l);
        this.idx = j;
        this.posDef.leftCur -= this.posDef.leftPlus * (l - j - 1);
      }

      o.geo.map = n;
      o.geo.zoom = 0.4;
      i.clear();
      i.setOption(o);
      this.zoomAnimation();
      this.defaultOpt.callback(n, o, i);
    },
    /**
     * name 地图名
     **/
    createBreadcrumb: function(name) {
      var cityToPinyin = {
        中国: "zhongguo",
        上海: "shanghai",
        河北: "hebei",
        山西: "shangxi",
        内蒙古: "neimenggu",
        辽宁: "liaoning",
        吉林: "jilin",
        黑龙江: "heilongjiang",
        江苏: "jiangsu",
        浙江: "zhejiang",
        安徽: "anhui",
        福建: "fujian",
        江西: "jiangxi",
        山东: "shangdong",
        河南: "henan",
        湖北: "hubei",
        湖南: "hunan",
        广东: "guangdong",
        广西: "guangxi",
        海南: "hainan",
        四川: "sichuan",
        贵州: "guizhou",
        云南: "yunnan",
        西藏: "xizang",
        陕西: "shanxi",
        甘肃: "gansu",
        青海: "qinghai",
        宁夏: "ningxia",
        新疆: "xinjiang",
        北京: "beijing",
        天津: "tianjin",
        重庆: "chongqing",
        香港: "xianggang",
        澳门: "aomen"
      };
      var breadcrumb = {
        type: "group",
        id: name,
        left: this.posDef.leftCur + this.posDef.leftPlus,
        top: this.posDef.top + 3,
        children: [
          {
            type: "polyline",
            left: -90,
            top: -5,
            shape: {
              points: this.lineDef
            },
            style: {
              stroke: "#fff",
              key: name
              // lineWidth: 2,
            },
            onclick: function() {
              var name = this.style.key;
              this.resetOption(this.myChart, this.mapOption, name);
            }
          },
          {
            type: "text",
            left: -68,
            top: "middle",
            style: {
              text: name,
              textAlign: "center",
              fill: this.styleDef.textColor,
              font: this.styleDef.font
            },
            onclick: function() {
              var name = this.style.text;
              this.resetOption(this.myChart, this.mapOption, name);
            }
          },
          {
            type: "text",
            left: -68,
            top: 10,
            style: {
              name: name,
              text: cityToPinyin[name] ? cityToPinyin[name].toUpperCase() : "",
              textAlign: "center",
              fill: this.styleDef.textColor,
              font: '12px "Microsoft YaHei", sans-serif'
            },
            onclick: function() {
              // console.log(this.style);
              var name = this.style.name;
              this.resetOption(this.myChart, this.mapOption, name);
            }
          }
        ]
      };
      //console.log('createBreadcrumb',this);
      this.posDef.leftCur += this.posDef.leftPlus;
      return breadcrumb;
    },
    // 设置effectscatter
    initSeriesData: function(data) {
      console.log("initSeriesData", data);
      var temp = [];
      for (var i = 0; i < data.length; i++) {
        var geoCoord = this.geoCoordMap[data[i].name];
        console.log("initSeriesData geoCoord", geoCoord);
        if (geoCoord) {
          temp.push({
            name: data[i].name,
            value: geoCoord.concat(data[i].value)
            // crew:data[i].crew,
            // company:data[i].company,
            // position:data[i].position,
            // region:data[i].region
          });
        }
      }
      return temp;
    },
    zoomAnimation: function() {
      var count = null;
      var _this = this;
      var zoom = function(per) {
        if (!count) count = per;
        count = count + per;
        // console.log(per,count);
        _this.myChart.setOption({
          geo: {
            zoom: count
          }
        });
        if (count < 1)
          window.requestAnimationFrame(function() {
            zoom(0.2);
          });
      };
      window.requestAnimationFrame(function() {
        zoom(0.2);
      });
    }
  }
};
</script>

<style scoped>
</style>
