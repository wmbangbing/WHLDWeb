<template>
<div>
 <div id="map">
    <TaskSelector :taskSelectorParam=taskSelectorParam @returnXBH="getSelectedXBH" id="SelectedXBH"/>
    <ExpandTable :expandTableParam=expandTableParam  id="expandTb"/>
    
 </div>
  <!-- <FieldTable id="table" :visible=fieldTableVisible  /> -->
  <!-- <SelectDialog @returnId="getSelectedId" :selectDialogParam=selectDialogParam   /> -->
  <!-- <ChartDialog  :chartParam=chartParam /> -->
  <PivottableDialog :pivottableParam=pivottableParam  />
  <FieldTableDialog :fieldTableParam=fieldTableParam />
</div>
 
</template>
<script>
import esriLoader from "esri-loader";
import FieldTable from '@/components/FieldTable'
import SelectDialog from '@/components/SelectDialog' 
import ChartDialog from '@/components/ChartDialog' 
import PivottableDialog from '@/components/PivottableDialog' 
import FieldTableDialog from '@/components/FieldTableDialog' 
import TaskSelector from '@/components/TaskSelector' 
import ExpandTable from '@/components/ExpandTable' 
import {createMap} from "./esriMap"
import { getMPData } from '@/api/monitoringPoint'
import { unique } from '@/utils/filterData'
// import store from './store'



export default  {
  name: 'EsriMap',
  data(){
    return {
      fieldTableVisible:false,
      selectDialogParam:{
        visible:false,
        data:""
      },
      chartParam:{
        visible:false,
        field:null        
      },
      pivottableParam:{
        visible:false,
        id:""
      },
      fieldTableParam:{
        visible:false,
        id:""
      },
      taskSelectorParam:{
        visible:false
      },
      expandTableParam:{
        visible:false,
        XBId:null,
        task:null
      },
      dialogFormVisible:false,
      selectId:[],
      xbLayer:undefined,
      view:undefined
    }
  },
  components:{
    FieldTable,
    SelectDialog,
    ChartDialog,
    PivottableDialog,
    FieldTableDialog,
    TaskSelector,
    ExpandTable
  },
  mounted(){      
    var self = this;
    this.initMap(self);
  },
  methods:{
    initMap(self){
      const options = {
        url: 'http://202.114.148.160/arcgis_js_api4.8/library/4.8/dojo/dojo.js',
        // url:'https://js.arcgis.com/4.9/'
      };
      createMap(esriLoader,options,self)
    },
    getSelectedId(Ids) {
      this.selectId = Ids;
      var str = "";

      for(let i = 0; i < Ids.length; i++){
        str = str + `number = ${Ids[i]} or `
      }
      var defineStr =  str.substring(0,str.length - 4);
      console.log(defineStr);
      this.jcLayer.definitionExpression = defineStr;
    },
    getSelectedXBH(value){
      this.expandTableParam.visible = !this.expandTableParam.visible;
      this.expandTableParam.XBId = value[1];
      this.expandTableParam.task = value[0];
      var query = this.xbLayer.createQuery();
      
      query.where = `XBH = ${value[1]}`;
      query.outFields = [ "XBH" ];
      query.returnGeometry = true;

      this.xbLayer.queryFeatures(query).then(reponse =>{
        this.view.goTo(reponse.features[0].geometry)    
      })
    },
    getData(){
      var self = this;
      getMPData().then(response => {
        var filterData = unique(response.data);
        self.selectDialogParam.data = filterData;
        self.selectDialogParam.visible = !self.selectDialogParam.visible;    
      })
    },
  },
}
</script>

<style>
  @import url('http://202.114.148.160/arcgis_js_api4.8/library/4.8/esri/css/main.css');
  /* @import url('https://js.arcgis.com/4.9/esri/css/main.css'); */
  #map{
    min-height: calc(100vh - 50px);
    position: relative;
    overflow: hidden;
  }  

  .layerTooltip {
    position: absolute;
    pointer-events: none;
    transition: opacity 200ms;
  }

  .layerTooltip>div {
    margin: 0 auto;
    padding: 12px;
    border-radius: 4px;
    box-shadow: 0px 0px 4px rgba(255, 255, 255, 0.75);
    transform: translate3d(-50%, -125%, 0);
  }

</style>

