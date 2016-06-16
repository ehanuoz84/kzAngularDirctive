var kavazakDirectives = angular.module('KzDirectives', []);

kavazakDirectives.directive('kzTrnslbl',function(fixedTranslateObject){
    return {
        restrict : 'E'
        ,replace:false
        ,scope :{findlable:'=lbl'
        }
        ,template : '<span>{{findlable}}</span>'
    }
});

/*kavazakDirectives.directive('kzTrnslbl',function(fixedTranslateObject){
return {
restrict : 'E'
,replace:false
,scope :{findlable:'@lbl'
,txtTranslateSource:'=objTranslation'
}
,template : '<span>{{txtFinalTranslate}}</span>'
, controller: function($scope, $element){
objTranslation
/// console.log("$scope.objTranslation",$scope.objTranslation) ;
}
,link: function (scope, element, attrs) {
scope.objTranslation=objTranslation;
scope.txtFinalTranslate=fixedTranslateObject.fixed(scope.objTranslation,scope.findlable);
/// console.log(" scope.txtFinalTranslate is : ", scope.txtFinalTranslate);
}
}
});*/

kavazakDirectives.directive('kzBreadcrumb',function(){
    return {
        replace:true,
        template:   '<li ng-repeat="breadcrumbval in breadcrumb">' +
        '<span ng-if="breadcrumbval.url"><a href="{{breadcrumbval.url}}">{{breadcrumbval.lbl}}</a></span>' +
        '<span ng-if="!breadcrumbval.url">{{breadcrumbval.lbl}}</span>' +
        '</li>'
    };
});

kavazakDirectives.directive('kzNavigatePath',function(){
    return {
        replace:true,
        template:'<article style="margin-top:7px !important;">'+
        '<ol class="navigation">'+
        '<li  ng-repeat="kzNavigationPathval in kzNavigatePath" >' +
        '<a href="javascript:void(0)" ><span ng-click="gotoPath(kzNavigationPathval.EventName,$index)" >{{kzNavigationPathval.lbl}}</span></a>' +
        '</li>'+
        '</ol>'+
        '<hr style="display: block; height: 1px; border: 0; border-top: 1px solid #ccc;    margin: 1em 0; padding: 0;" />'+
        '</article>'

    };
});

kavazakDirectives.directive('kzNavigationPath',function(){
    return {
        replace:true,
        template:       '<ol class="navigation">'+
        '<li  ng-repeat="kzNavigationPathval in kzNavigatePath" >' +
        '<a href="javascript:void(0)" ><span ng-click="gotoPath(kzNavigationPathval.EventName,$index)" >{{kzNavigationPathval.lbl}}</span></a>' +
        '</li>'+
        '</ol>'

    };
});
kavazakDirectives.directive('kzNavigationPathDaynamic', function() {
    return {
        replace:true,
        restrict: 'E',
        scope: {
            NavigationArrayItems: '=arrItems'
            ,NavigationPathHandlerPath:'=clickEvent'
        },
        template: '<ol class="navigation">'+
        '<li  ng-repeat="kzNavigationPathval in NavigationArrayItems" >' +
        '<a href="javascript:void(0)" ><span ng-click="gotoPath(kzNavigationPathval.EventName,$index)" >{{kzNavigationPathval.lbl}}</span></a>' +
        '</li>'+
        '</ol>'
        ,link: function (scope) {
            console.log(scope.NavigationArrayItems);

        },controller: function ($scope, $element) {
            /// controller for Directive
            $scope.gotoPath=function(eventName,selIndex)
            {
                var outPutParams={
                    eventName:eventName,
                    index:selIndex
                }
                $scope.NavigationPathHandlerPath(outPutParams); 
            }
        }

    };
});



kavazakDirectives.directive('kzAlertModal',function(){
    return {
        replace:true
        /* ,scope:{
        closelbl:'=closelbl'
        }*/
        ,template: '<div id="kzAlertModal_Id" class="modal fade">' +
        '<div class="modal-dialog modal-sm">' +
        '<div class="modal-content">' +
        '<div class="modal-header">' +
        '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' +
        '</div>' +
        '<div class="modal-body">' +
        '<p class="text-info"><small>{{kzAlertModalMsg}}</small></p>' +
        '</div>' +
        '<div class="modal-footer">' +
        /*'<button type="button"   class="btn btn-default" data-dismiss="modal" ><kz-trnslbl lbl="funcLangTranslate(\'Ok\')"  /></button>' +*/
        '<button type="button"   class="btn btn-default" data-dismiss="modal" >{{kzAlertModalcloselbl?kzAlertModalcloselbl:"Close"}}</button>' +
        ' </div>' +
        ' </div>' +
        ' </div>' +
        ' </div>'

    };
});
kavazakDirectives.directive('kzAlertModalWithAttr',function(){
    return {
        replace:true
        /* ,scope:{
        closelbl:'=closelbl'
        }*/
        ,template: '<div id="" class="modal fade">' +
        '<div class="modal-dialog modal-sm">' +
        '<div class="modal-content">' +
        '<div class="modal-header">' +
        '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' +
        '</div>' +
        '<div class="modal-body">' +
        '<p class="text-info"><small>{{kzAlertModalMsg}}</small></p>' +
        '</div>' +
        '<div class="modal-footer">' +
        /*'<button type="button"   class="btn btn-default" data-dismiss="modal" ><kz-trnslbl lbl="funcLangTranslate(\'Ok\')"  /></button>' +*/
        '<button type="button"   class="btn btn-default" data-dismiss="modal" >{{kzAlertModalcloselbl?kzAlertModalcloselbl:"Close"}}</button>' +
        ' </div>' +
        ' </div>' +
        ' </div>' +
        ' </div>' 
        ,link: function (scope, element, attrs) {
            //   console.log("attrs",attrs);
            //  console.log("attrs",attrs.id);
            // console.log("attr",attr);
        }

    };
});
//---------------------------------------------------------
// --------------------------------------Directives
kavazakDirectives.directive('kzUidialog', function (DialogService) {
    return {
        //Jalali : you can use it as Element, Attribute or Class in your HTML Code
        restrict: 'EAC',
        transclude: true,
        scope: { urlForOpeninDialog: '@dialogurl',
            optionsForOpeningDialog: '@dialogoption'
        },
        template:"<div ng-click=\"openthis('{{urlForOpeninDialog}}')\" ng-transclude></div>",
        link: function (scope, element, attrs) {
            scope.openthis= function openthis(){
                //Jalali&Rooholah : Here we prepare a default value for dialog options, If we dont we will have error in FireFox
                if(!scope.optionsForOpeningDialog){scope.optionsForOpeningDialog="{}";}
                scope.optionsForOpeningDialog
                if(!scope.urlForOpeninDialog){
                    alert(" Error in parameters: setting 'dialogurl' is necessary  in  kzUidialog") ;
                    return false;
                }
                //Jalali : Here we call OpenDialog function in DialogService to open the urlForOpeninDialog address in a UIDialog
                DialogService.OpenDialog(scope.urlForOpeninDialog,scope.optionsForOpeningDialog);
            };
        }
}});

//-------------------------------Form directive validation-----------------------------
/*app.directive('coding', function() {
var CODING_REGEXP = /^[0-9a-zA-Z][0-9a-zA-Z_]{1,19}$/;
return {
require: 'ngModel',
link: function(scope, elm, attrs, ctrl) {
ctrl.$validators.coding = function(modelValue, viewValue) {
if (ctrl.$isEmpty(modelValue)) {
// consider empty models to be valid
return true;
}

if (CODING_REGEXP.test(viewValue)) {
// it is valid
return true;
}

// it is invalid
return false;
};
}
};
});*/

// --------------------------------------End Of Directives

