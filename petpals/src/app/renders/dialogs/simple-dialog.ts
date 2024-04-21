import {Component, Inject} from "@angular/core";
import {
	MAT_DIALOG_DATA,
	MatDialogActions,
	MatDialogClose,
	MatDialogContent,
	MatDialogTitle
} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";

@Component({
	selector: 'dialog-elements-example-dialog',
	templateUrl: 'simple-dialog.html',
	standalone: true,
	imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule],
})
export class DialogElementsExampleDialog {
	constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
	}
}