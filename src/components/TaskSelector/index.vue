<template>
<div>
  <div class="" style="width:150px;" v-if="visible">
    <el-cascader
      :options="options"
      @change="handleChange">
    ></el-cascader>
  </div>
  <div v-else></div>
</div>

</template>
<script>
import { getFormData } from '@/api/formData'


export default {
  data() {
    return {
      visible:this.taskSelectorParam.visible,
      options: [],
    };
  },
  props:[
    "taskSelectorParam"
  ],
  watch:{
    "taskSelectorParam.visible":function(curVal,oldVal){
      this.visible = true;
      this.createSelectorData()
    }
  },
  created(){},
  methods: {
    createSelectorData(){
      getFormData("task").then(response =>{      
        this.options = [];
        let datas = response.data;       
        datas.map((data,index)=>{
          this.options.push({});
          this.options[index].label = data.Title;
          this.options[index].value = data.Id;
          this.options[index].children = [];
          data.Plans.map((plan,idx)=>{
            this.options[index].children.push({});
            this.options[index].children[idx].label = `小班号${plan.XBInfo.XBH}` ;
            this.options[index].children[idx].value = plan.XBInfo.XBH;       
          })
        })
        // console.log(this.options)      
      })
    },
    handleChange(value){
      console.log(value);
      this.$emit('returnXBH',value)
    }
  }
};
</script>
