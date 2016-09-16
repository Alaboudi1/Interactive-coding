import {inject} from 'aurelia-framework'
import {EventAggregator} from 'aurelia-event-aggregator'
@inject(EventAggregator)
export class InfoSign {

    constructor(eventAggregator) {
        this.event = eventAggregator;
        this.infoSign;
        this.position;
        this.widget = false;
        this.subscribe();

    }
    attached() {
        if (this.infoSign) {

            let annotstions = [];
            for (let sign of this.infoSign.FunctionDeclaration) {
                let newAnno = {
                    row: sign.loc.start.line - 1,
                    column: sign.loc.start.column,
                    text: "This function has not been exercised yet",
                    type: "warning" // also warning and information

                }
                annotstions.push(newAnno);
            }
            this.editor.getSession().setAnnotations(annotstions);
        }
    }


    print() {
        if (!this.widget) {
            let event = this.event
            console.log("Here")

            let onMouseDown = function (e) {
                let widget = e.target;
                console.log(e.target);
                if (widget.classList.contains("widget")) {
                    event.publish('onDialogRequest')
                    e.stopPropagation();
                }
            };
            this.editor.container.addEventListener("mousedown", onMouseDown, true);
            this.widget = true;
        }
    }


    setAnnotations() {


        this.editor.getSession().lineAnnotations = {
            0: { display: "add test" },
            6: { display: "line 6" },
            10: { display: "line 13" }
        }


        //    this.editor.getSession().lineAnnotations.forEach(function (item) {
        //         if (item && item.element && item.element.parentNode)
        //             item.element.remove();
        //     });
    }


    subscribe() {
        this.event.subscribe('onTraverseEnds', (payload) => {
            this.infoSign = payload;
            console.info(this.infoSign);

        });


        this.event.subscribe('onEditorReady', (editor) => {
            this.editor = editor;
            //   this.print();
            this.setAnnotations();


        });

        this.event.subscribe('OnEditorChanged', payload => {
            this.attached();
            //   this.updateLines(payload.render);


        });
        this.event.subscribe('onTestEnsureEnds', functionData => {
            console.log(functionData);
            //              this.editor.session.clearBreakpoint(0);
            for (let [functionName, value] of functionData) {
                for (let result of value.testCases)
                    if (result.NoError)
                        this.editor.session.setBreakpoint(value.metaData[0].location.start.line-1, "sucess");
                    else
                        this.editor.session.setBreakpoint(value.metaData[0].location.start.line-1);
            }
        });


    }

    updateLines(renderer) {
        let textLayer = renderer.$textLayer;
        let config = textLayer.config;
        let session = textLayer.session;
        if (!session.lineAnnotations) return;

        let first = config.firstRow;
        let last = config.lastRow;

        let lineElements = textLayer.element.childNodes;
        let lineElementsIdx = 0;

        let row = first;
        let foldLine = session.getNextFoldLine(row);
        let foldStart = foldLine ? foldLine.start.row : Infinity;

        let useGroups = textLayer.$useLineGroups();

        while (true) {
            if (row > foldStart) {
                row = foldLine.end.row + 1; console.log(row);
                foldLine = textLayer.session.getNextFoldLine(row, foldLine);
                foldStart = foldLine ? foldLine.start.row : Infinity;
            }
            if (row > last)
                break;

            let lineElement = lineElements[lineElementsIdx++];
            if (lineElement && session.lineAnnotations[row]) {
                if (useGroups) lineElement = lineElement.lastChild;
                let widget, a = session.lineAnnotations[row];
                if (!a.element) {
                    widget = document.createElement("span");
                    widget.textContent = a.display;
                    widget.className = "widget stack-message" + (a.more ? " more" : "");
                    widget.annotation = a;
                    session.lineAnnotations[row].element = widget;
                }
                else widget = a.element;

                lineElement.appendChild(widget);
            }
            row++;
        }

    }

    clearDecoration(session) {
        // console.log(session.lineAnnotations);
        if (session.lineAnnotations) {

            for (let item in session.lineAnnotations) {

                if (item && item.element && item.element.parentNode) {
                    item.element.remove();
                }
            }
        }

        session.lineAnnotations = [];
    }
}