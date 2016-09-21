import {inject} from 'aurelia-framework'
import {EventAggregator} from 'aurelia-event-aggregator'
@inject(EventAggregator)
export class InfoSign {

    constructor(eventAggregator) {
        this.event = eventAggregator;
        this.infoSign;

    }
    attachTestSign(signs) {


        let annotstions = [];
        let newAnno = {};
        for (let sign of signs) {
            if (sign.sign) {
                let message;
                message = sign.sign.errorCount ? `${sign.sign.errorCount} out of ${sign.sign.testCases} test cases Fail` :
                    `All the ${sign.sign.testCases} test cases Pass`
                newAnno = {
                    row: sign.sign.location,
                    column: 1,
                    text: message,
                    type: "info" // also warning and information
                }
            }
            else {
                let message;
                message = `Function ${sign.id} has not been exercised yet`
                newAnno = {
                    row: sign.location,
                    column: 1,
                    text: message,
                    type: "warning" // also warning and information
                }
            }
            annotstions.push(newAnno);
        }
       this.publish("setAnnotations", annotstions);
      //  this.event.publish('setAnnotations', annotstions)

    }




    subscribe() {
        this.event.subscribe('onTraverseEnds', (payload) => {
                this.infoSign = payload;
        });


        this.event.subscribe('onTestEnsureEnds', functionData => {
            let signs = this.createTestStatus(functionData);
            this.setTestStatus(signs);
            this.publish("setBreakpointRequest", signs);

        });
    }
    createTestStatus(functionData) {
        let errorCount = 0
        let testCases = 0;
        let location;
        let signs = [];
        let cssClass = "noError";
        for (let [functionName, value] of functionData) {
            for (let result of value.testCases) {
                testCases++;
                location = value.metaData.location;
                if (!result.NoError) {
                    cssClass = "error"
                    errorCount++;
                }
            }
            signs.push({
                errorCount: errorCount,
                testCases: testCases,
                location: location,
                cssClass: cssClass
            });
            errorCount = 0;
            testCases = 0;
            cssClass = "noError";
        }
        return signs;
    }
    setTestStatus(signs) {
        signs.forEach(item => {
            for (let i = 0; i < this.infoSign.length; i++) {
                if (item.location === this.infoSign[i].location)
                    this.infoSign[i].sign = item;
            }
        });
        this.attachTestSign(this.infoSign)

    }

    publish(event, payload) {

        switch (event) {
            case 'setAnnotations':
                this.event.publish('setAnnotations', payload)
                break;
            case 'setBreakpointRequest':
                this.event.publish('setBreakpointRequest', payload)
                break;
        }
    }
}

