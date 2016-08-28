import {inject} from 'aurelia-framework'
import {EventAggregator} from 'aurelia-event-aggregator'

@inject(EventAggregator)
export class InfoSign {


   constructor(eventAggregator){
       this.event = eventAggregator;
       this.infoSign=0;
       this.subscribe();

   } 
    attached(){
    this.tooltip.style.left = '600px';
    this.tooltip.style.top = '5px';
    $('i.my-tool-tip').tooltip({
      placement:'right'
    });
  }


  print(){

      console.log('hello');
  }


  subscribe(){
      this.event.subscribe('onTraverseEnds', (payload)=>{
         this.infoSign = payload.NumberOfFunction;
         console.log('infoSign = '+ this.infoSign );
      });

  }
}