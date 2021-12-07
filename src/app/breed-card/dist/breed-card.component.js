"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.BreedCardComponent = void 0;
var core_1 = require("@angular/core");
var breed_details_card_component_1 = require("../breed-details-card/breed-details-card.component");
var apa_class_component_1 = require("../apa-class/apa-class.component");
var breed_purpose_component_1 = require("../breed-purpose/breed-purpose.component");
var BreedCardComponent = /** @class */ (function () {
    function BreedCardComponent(fetchApiData, convertBreedData, // Public to be used in the template
    userDataStore, snackBar, dialog) {
        var _this = this;
        this.fetchApiData = fetchApiData;
        this.convertBreedData = convertBreedData;
        this.userDataStore = userDataStore;
        this.snackBar = snackBar;
        this.dialog = dialog;
        this.breedsToDisplay = [];
        this.breeds = [];
        this.userFavoriteBreeds = [];
        this.backupImgUrl = '../../assets/breed_photos/frankie2.jpeg';
        this._subscription_UserFavoriteBreeds = this.userDataStore.userFavorites.subscribe(function (data) {
            _this.userFavoriteBreeds = data.map(function (obj) { return obj._id; });
        });
    }
    BreedCardComponent.prototype.ngOnInit = function () {
    };
    BreedCardComponent.prototype.openBreedDetailsDialog = function (breed) {
        this.dialog.open(breed_details_card_component_1.BreedDetailsCardComponent, {
            width: '400px',
            data: {
                breed: breed
            }
        });
    };
    BreedCardComponent.prototype.openApaClassDetailsDialog = function (apaClass) {
        this.dialog.open(apa_class_component_1.ApaClassComponent, {
            width: '400px',
            data: {
                apaClass: apaClass
            }
        });
    };
    BreedCardComponent.prototype.openBreedPurposeDetailsDialog = function (purpose) {
        this.dialog.open(breed_purpose_component_1.BreedPurposeComponent, {
            width: '400px',
            data: {
                breedPurpose: purpose
            }
        });
    };
    BreedCardComponent.prototype.addBreedToUserFavorites = function (breed) {
        var _this = this;
        console.log(breed);
        this.fetchApiData.addToUserFavorites(breed._id).subscribe({
            next: function (response) {
                console.log(response);
                _this.snackBar.open(breed.breed + " has been added to your favorites", 'OK', {
                    duration: 2000
                });
            }, error: function (response) {
                console.log(response);
                _this.snackBar.open(response, 'OK', {
                    duration: 2000
                });
            }
        });
    };
    BreedCardComponent.prototype.removeBreedFromUserFavorites = function (breed) {
        var _this = this;
        this.fetchApiData.removeFromUserFavorites(breed._id).subscribe({
            next: function (response) {
                _this.userDataStore.updateUserFavorites(response);
                _this.snackBar.open(breed.breed + " has been removed from your favorites", 'OK', {
                    duration: 2000
                });
            }, error: function (response) {
                console.log(response);
                _this.snackBar.open(response, 'OK', {
                    duration: 2000
                });
            }
        });
    };
    __decorate([
        core_1.Input()
    ], BreedCardComponent.prototype, "breedsToDisplay");
    BreedCardComponent = __decorate([
        core_1.Component({
            selector: 'app-breed-card',
            templateUrl: './breed-card.component.html',
            styleUrls: ['./breed-card.component.scss']
        })
    ], BreedCardComponent);
    return BreedCardComponent;
}());
exports.BreedCardComponent = BreedCardComponent;
// let favoritesArray = response.map((obj: any) => obj._id);
