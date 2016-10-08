var app = angular.module('myApp',[ ]);
    app.controller('questionCtrl',function($scope,$http){
        //选中单选按钮
            $(".radiobox").selectRadio(

            );
        $scope.genData = function(){
            var phone = "13683815260";
            $http.get("http://192.168.5.148:8888/api/userrisk/query?phone="+phone)
                .success(
                function(data)
                {
                    //是否成功
                    if(data.status == true){
                        //显示结果
                        $(".wind").show();
                        if(data.entity){
                            var entity = data.entity;
                            //选择各个值
                            for(var i=1;i<12;i++){
                                var value = entity["item"+i];
                                $("input[name='item"+i+"'][value='"+value+"']").trigger("click");
                            }
//分数
                            $("#totalScore").text(data.entity.totalScore);
//级别
                            $("#modelLevel").text("风险等级"+data.entity.modelLevel);
//类型
                            $("#modelMemo").text(data.entity.modelMemo);
                        }
                    }else{
                        alert(data.msg);
                    }

                });
        }
        $scope.genData();
        /*=====*/
        $scope.qreResult= function(){
            $(".myt11").slideToggle("fast");
                var model={};
                for(var i=1;i<12;i++){
                    var $item = $("input[name='item"+i+"']");
                    var len=$item.length;
                    var hasChecked = false;
                    for(var j=0;j<len;j++){
                        if($item[j].checked==true){
                            hasChecked = true;
                            var itName=$item[j].name;
                            var itValue=$item[j].value;
                            model[itName] = itValue;
                            break;
                        }
                    }
                    if(hasChecked == false){
                        alert("您有未完成题目");
                        return false;
                    }
                }
                model.phoneNumber="13683815260";
                model.userId="firetw";
                model.token= null;
            $http.post("http://192.168.5.148:8888/api/userrisk/add",model)
                .success(
                function(data)
                {
                    //console.log(data);
                    //是否成功
                    if(data.status == true){
                        if(data.entity){
                            //分数
                            $("#totalScore").text(data.entity.totalScore);
                            //级别
                            $("#modelLevel").text("风险等级"+data.entity.modelLevel);
                            //类型
                            $("#modelMemo").text(data.entity.modelMemo);
                        }
                    }else{
                        alert(data.msg);
                    }
                });
        }
        /*===*/
        /**
         * 下一题
         * @param pageIndex
         */
        $scope.nextPage=function(pageIndex){
            var clazz=".myt"+pageIndex;
           $(clazz).slideToggle("fast");
        };
        /**
         *
         * @param pageIndex
         */
        $scope.prePage=function(pageIndex){
            var clazz=".myt"+pageIndex;
            $(clazz).slideToggle("fast");
        };
        /*=点击隐藏翻页=*/

         /*===*/
//重新测评
        $scope.reassess= function(){
            $(window).scrollTop(0);
            $(".maire,.mairy").show();
        }

    });
        /*===*/
/*--查看结果--*/

/*--查看结果--*/



