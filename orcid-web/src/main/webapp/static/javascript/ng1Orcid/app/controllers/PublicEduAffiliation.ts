declare var ActSortState: any;
declare var GroupedActivities: any;
declare var orcidVar: any;

import * as angular from 'angular';
import {NgModule} from '@angular/core';

// This is the Angular 1 part of the module
// Controller to show alert for unread notifications
export const PublicEduAffiliation = angular.module('orcidApp').controller(
    'PublicEduAffiliation', 
    [
        '$compile', 
        '$filter', 
        '$location', 
        '$scope', 
        'affiliationsSrvc', 
        'utilsService', 
        'workspaceSrvc', 
        function (
            $compile, 
            $filter, 
            $location, 
            $scope, 
            affiliationsSrvc, 
            utilsService, 
            workspaceSrvc 
        ){
            $scope.affiliationsSrvc = affiliationsSrvc;
            $scope.moreInfo = {};
            $scope.sortState = new ActSortState(GroupedActivities.AFFILIATION);
            $scope.utilsService = utilsService;
            $scope.workspaceSrvc = workspaceSrvc;
            $scope.showElement = {};
            $scope.printView = $scope.utilsService.isPrintView(window.location.pathname);

            $scope.closeMoreInfo = function(key) {
                $scope.moreInfo[key]=false;
            };

            $scope.getDisambiguatedAffiliation = function(id) {
                $.ajax({
                    url: getBaseUri() + '/affiliations/disambiguated/id/' + id,
                    dataType: 'json',
                    type: 'GET',
                    success: function(data) {
                        if (data != null) {
                            console.log(data);
                            $scope.disambiguatedAffiliation = data;
                            $scope.editAffiliation.orgDisambiguatedId.value = id;
                            $scope.editAffiliation.disambiguatedAffiliationSourceId = data.sourceId;
                            $scope.editAffiliation.disambiguationSource = data.sourceType;
                            $scope.$apply();
                        }
                    }
                }).fail(function(){
                    console.log("error getDisambiguatedAffiliation(id)");
                });
            };

            $scope.hideTooltip = function (element){        
                $scope.showElement[element] = false;
            };

            // remove once grouping is live
            $scope.moreInfoMouseEnter = function(key, $event) {
                $event.stopPropagation();
                if (document.documentElement.className.indexOf('no-touch') >= 0) {
                    $scope.moreInfo[key]=true;
                }
            };

            $scope.showDetailsMouseClick = function(group, $event) {
                $event.stopPropagation();
                $scope.moreInfo[group.groupId] = !$scope.moreInfo[group.groupId];   
            };

            $scope.showTooltip = function (element){        
                $scope.showElement[element] = true;
            };

            $scope.sort = function(key) {       
                $scope.sortState.sortBy(key);
            };

            // remove once grouping is live
            $scope.toggleClickMoreInfo = function(key) {
                if (document.documentElement.className.indexOf('no-touch') == -1 ) {
                    $scope.moreInfo[key]=!$scope.moreInfo[key];
                }
            };
        }
    ]
);

// This is the Angular 2 part of the module
@NgModule({})
export class PublicEduAffiliationNg2Module {}