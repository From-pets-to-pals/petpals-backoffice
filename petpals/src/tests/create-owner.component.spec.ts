import {ComponentFixture, TestBed} from '@angular/core/testing';
import {CreateOwnerComponent} from '../app/components/create-owner/create-owner.component';
import options from "../app/models/menus/select.options";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import dayjs from "dayjs";

describe('CreateOwnerComponent', () => {
    let component: CreateOwnerComponent;
    let fixture: ComponentFixture<CreateOwnerComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CreateOwnerComponent, BrowserAnimationsModule]
        })
            .compileComponents();
        fixture = TestBed.createComponent(CreateOwnerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
    it('should set good options and update pal in pals list', () => {
        expect(component).toBeTruthy();
        for (let i = 0; i < options.passport.length; i++) {
            expect(component.passportOptions[i].label).toEqual(options.passport[i].label)
            expect(component.passportOptions[i].value).toEqual(options.passport[i].value)
        }
        for (let i = 0; i < options.gender.length; i++) {
            expect(component.sexOptions[i].label).toEqual(options.gender[i].label)
            expect(component.sexOptions[i].value).toEqual(options.gender[i].value)
        }
        for (let i = 0; i < options.palsHandled.length; i++) {
            expect(component.speciesOptions[i].label).toEqual(options.palsHandled[i].label)
            expect(component.speciesOptions[i].value).toEqual(options.palsHandled[i].value)
        }
        expect(component.form.controls.pals.length).toEqual(1)
        component.AddPalToList()
        expect(component.form.controls.pals.length).toEqual(2)
        component.AddPalToList()
        expect(component.form.controls.pals.length).toEqual(3)
        component.RemoveLastPal()
        expect(component.form.controls.pals.length).toEqual(2)
        component.RemovePal(1)
        expect(component.form.controls.pals.length).toEqual(1)
    });

    it('should open snackbar', () => {
        expect(component).toBeTruthy();
        spyOn(component, "openSnackBar").withArgs("Invalid form", "Close").and.callThrough()
        component.ShowList()
        expect(component.openSnackBar).toHaveBeenCalled()
    });

    it('should set location and device', async () => {
        expect(component).toBeTruthy();
        spyOn(component, "GetLocationData").withArgs("hohoho").and.callThrough()
        component.GetLocationData("hohoho")
        expect(component.GetLocationData).toHaveBeenCalled()
        expect(component.form.get("location")?.value).toEqual("hohoho")

    });

    it('should map owner and call back', async () => {
        expect(component).toBeTruthy();
        const date = dayjs().toDate()
        // @ts-ignore
        component.form = new FormGroup({
            location: new FormControl("PARIS_FRANCE", {
                validators: [Validators.required],
                nonNullable: true
            }),
            deviceId: new FormControl('OPPO X59', {
                validators: [Validators.required, Validators.minLength(3)],
                nonNullable: true
            }),
            email: new FormControl('sa.bennaceur@test.com', {
                validators: [Validators.required, Validators.email],
                nonNullable: true
            }),
            username: new FormControl('Athos', {
                validators: [Validators.required, Validators.minLength(4)],
                nonNullable: true
            }),
            phoneNumber: new FormControl('0756565656', {
                validators: [Validators.required, Validators.minLength(10), Validators.maxLength(10)],
                nonNullable: true
            }),
            pals: new FormArray(
                [new FormGroup({
                    palIdentityInformation: new FormGroup(
                        {
                            name: new FormControl('Ashe', {
                                validators: [Validators.required, Validators.minLength(3)],
                                nonNullable: true
                            }), birthDate: new FormControl(date, {
                                nonNullable: false
                            }), shortName: new FormControl(null, {
                                nonNullable: false
                            }), isMale: new FormControl(true, {
                                validators: [Validators.required],
                                nonNullable: true
                            }), specie: new FormControl('DOG', {
                                validators: [Validators.required],
                                nonNullable: true
                            }), breed: new FormControl('Husky', {
                                validators: [Validators.required, Validators.minLength(3)],
                                nonNullable: true
                            }), hasPassport: new FormControl(false, {
                                validators: [Validators.required],
                                nonNullable: true
                            }), icadIdentifier: new FormControl('250261515151515', {
                                validators: [Validators.required, Validators.pattern("^(250)(26|22)\\d{10}$")],
                                nonNullable: true
                            })
                        }
                    ),
                    palMedicalInformation: new FormGroup(
                        {
                            nextVaccine: new FormControl(date, {
                                validators: [Validators.required],
                                nonNullable: true
                            }),
                            nextPlannedVetApp: new FormControl(date, {
                                nonNullable: false
                            }),
                            isVaccinated: new FormControl(true, {
                                validators: [Validators.required],
                                nonNullable: true
                            }),
                            isSterilized: new FormControl(false, {
                                validators: [Validators.required],
                                nonNullable: true
                            }),
                        }
                    ),
                    palMeasurement: new FormGroup(
                        {
                            weight: new FormControl(0.1, {
                                validators: [Validators.required, Validators.min(0.1), Validators.max(200.0)],
                                nonNullable: true
                            }),
                            height: new FormControl(0.1, {
                                validators: [Validators.required, Validators.min(0.1), Validators.max(200.0)],
                                nonNullable: true
                            }),
                        }
                    ),
                })]
            )
        })
        expect(component.form.valid).toBeTruthy()
        spyOn(component, "mapOwner").and.callThrough();
        const callWith = component.mapOwner();
        await spyOn(component.GetPalsApiService(), "createOwner").and.resolveTo(Promise.resolve({data: "123456789"}));
        component.ShowList()
        expect(component.mapOwner).toHaveBeenCalledTimes(2);
        expect(component.GetPalsApiService().createOwner).toHaveBeenCalledWith(callWith);
    });
});
