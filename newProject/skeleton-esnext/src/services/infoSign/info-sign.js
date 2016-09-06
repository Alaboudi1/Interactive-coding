import {inject} from 'aurelia-framework'
import {EventAggregator} from 'aurelia-event-aggregator'
import {DialogService} from 'aurelia-dialog';
import Dialog from '../../dialog/dialog';
@inject(EventAggregator, DialogService)
export class InfoSign {

    constructor(eventAggregator, dialogService) {
        this.event = eventAggregator;
        this.infoSign;
        this.position;
        this.subscribe();
        this.dialogService = dialogService;

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


    print(dialog, info) {

        console.log(this);
        dialog.open({ viewModel: 'dialog/dialog', modeel: 'dialog/dialog' }).then(response => {
            if (!response.wasCancelled) {
                console.log('good');
            } else {
                console.log('bad');
            }
            console.log(response.output);
        });
    }

    setAnnotations() {
        this.editor.getSession().lineAnnotations = {
            0: { display: "add test" },
            6: { display: "line 6" },
            13: { display: "line 13" }
        }
    }


    subscribe() {
        this.event.subscribe('onTraverseEnds', (payload) => {
            this.infoSign = payload;
        });
        

        this.event.subscribe('onEditorReady', (editor) => {
            this.editor = editor;
            this.setAnnotations();


        const print = this.print;
        const dialog = this.dialogService;
        let info = this.infoSign;
        let onMouseDown = function (e) {
            let widget = e.target;
            if (widget.classList.contains("widget")) {
                print(dialog, info);
                console.log(print);
                e.stopPropagation();
            }
        };
        this.editor.container.addEventListener("mousedown", onMouseDown, true);
        this.attached();


        });

        this.event.subscribe('onSignRequest', render => {
            this.updateLines(render);

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
                row = foldLine.end.row + 1;
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