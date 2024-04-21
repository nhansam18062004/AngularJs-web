
angular.module('myapp', ['ngRoute'])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'home.html?' + Math.random(),
                controller: 'homeCtrl'
            })
            .when('/dang-nhap', {
                redirecTO: '/login'
            })
            .when('/sanpham/:id', {
                templateUrl: 'sanpham.html?' + Math.random(),
                controller: 'sanphamCtrl'
            })
            .when('/lienhe', {
                templateUrl: 'lienhe.html?' + Math.random(),
                controller: 'lienheCtrl'
            })
            // .when('/thanhtoan', {
            //     templateUrl: 'thanhtoan.html?' + Math.random(),
            //     controller: 'thanhtoanCtrl'
            // })
            .when('/tintuc', {
                templateUrl: 'tintuc.html?' + Math.random(),
                controller: 'tintucCtrl'
            })
            .when('/qmk', {
                templateUrl: 'qmk.html?' + Math.random(),
                controller: 'qmkCtrl'
            })
            .when('/bill', {
                templateUrl: 'bill.html?' + Math.random(),
                controller: 'billCtrl'
            })
            .when('/detail/:id', {
                templateUrl: 'spchitiet.html?' + Math.random(),
                controller: 'detailCtrl'
            })
            .when('/cart', {
                templateUrl: 'cart.html?' + Math.random(),
                controller: 'cartCtrl'
            })
            .when('/vang18k/:id', {
                templateUrl: 'Productlist.html?' + Math.random(),
                controller: 'vang18kCtrl'

            })
            .when('/vang24k/:id', {
                templateUrl: 'Productlist.html?' + Math.random(),
                controller: 'vang24kCtrl'
            })
            .when('/vangtrang/:id', {
                templateUrl: 'Productlist.html?' + Math.random(),
                controller: 'vangtrangCtrl'
            })
            //admin
            .when('/dmuc', {
                templateUrl: 'dmuc.html?' + Math.random(),
                controller: 'dmucCtrl'
            })
            .when('/sp', {
                templateUrl: 'sp.html?' + Math.random(),
                controller: 'spCtrl'
            })
            .when('/user', {
                templateUrl: 'user.html?' + Math.random(),
                controller: 'userCtrl'
            })
            .otherwise({
                template: '<h1>404-không tìm thấy trang</h1>'
            })
    })
    .controller('detailCtrl', function ($scope, $routeParams) {
        $scope.id = $routeParams.id;
        $scope.sp = $scope.dssp.filter(i => i.id == $scope.id)[0];
    })
    .controller('homeCtrl', function ($scope) {
    })
    .controller('sanphamCtrl', function ($scope, $routeParams) {
        $scope.id = $routeParams.id
    })
    .controller('lienheCtrl', function ($scope) {
    })
    .controller('billCtrl', function ($scope) {
    })
    .controller('qmkCtrl', function ($scope) {
    })
    .controller('tintucCtrl', function ($scope) {
    })
    .controller('cartCtrl', function ($scope) {
    })
    .controller('thanhtoanCtrl', function ($scope) {
    })
    .controller('vang24kCtrl', function ($scope, $routeParams) {
        // $scope.title = "loai MANAGER";
        $scope.id = $routeParams.id
    })
    .controller('vang18kCtrl', function ($scope, $routeParams) {
        // $scope.title = "SUPPLIER MANAGER";
        $scope.id = $routeParams.id;
    })
    .controller('vangtrangCtrl', function ($scope, $routeParams) {
        // $scope.title = "SPECIAL MANAGER";
        $scope.id = $routeParams.id;

    })
    //admin
    .controller('userCtrl', function ($scope) {
    })
    .controller('spCtrl', function ($scope) {
    })
    .controller('dmucCtrl', function ($scope) {
    })


    .run(function ($rootScope, $timeout) {
        $rootScope.$on('$routeChangeStart', function () {
            $rootScope.isLoading = true;
        });
        $rootScope.$on('$routeChangeSuccess', function () {
            //làm chậm lại
            // $timeout(function(){
            //     $rootScope.isLoading = false;
            // },1000)
            $rootScope.isLoading = false;

        });
        $rootScope.$on('$routeChangErorr', function () {
            $rootScope.isLoading = true;
            alert('Lỗi! Không tải được trang')
        });
    })
    .filter('search', function () {
        return function (input, keyword, attr) {
            let kq = []
            if (keyword) {
                keyword = keyword.toLowerCase();
                attr.forEach(thuoctinh => {
                    let tmp = input.filter(item => {
                        return item[thuoctinh].toString().toLowerCase().indexOf(keyword) >= 0
                    });
                    kq.push(...tmp)
                });
            }
            else { kq = input }
            return kq;
        }
    })
    .controller('myctrl', function ($scope, $filter, $http, $interval) {
        //dki tài khoản
        $scope.accounts = localStorage.getItem('USER') ? JSON.parse(localStorage.getItem('USER')) : [];
        $scope.addAccount = function () {
            var newAccount = {
                username: $scope.username,
                password: $scope.password
            };


            // for (var i = 0; i < $scope.accounts.length; i++) {
            //     if ($scope.accounts[i].username === username) {
            //         $scope.message = 'Tài khoản đã tồn tại!';
            //     } else {

            //     }
            // }

            $scope.accounts.push(newAccount);
            localStorage.setItem('USER', JSON.stringify($scope.accounts));

            $scope.username = '';
            $scope.password = '';
            $scope.repassword = '';

            alert('Đăng ký thành công')
            console.log($scope.accounts)
        };
        //đăng nhập
        $scope.login = function () {
            var tk = $scope.tk;
            var mk = $scope.mk;
            for (var i = 0; i < $scope.accounts.length; i++) {
                if ($scope.accounts[i].username === tk && $scope.accounts[i].password === mk) {
                    $scope.message = 'Đăng nhập thành công!';
                } else {
                    $scope.message = 'Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin đăng nhập.';
                }
                $scope.tk = '';
                $scope.mk = '';
            }

        };
        //giờ
        $interval(function () {
            $scope.now = new Date();
        }, 1000);
        $scope.dstinh = [];
        $http.get('https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json').then(
            function (res) {//thành công
                $scope.dstinh = res.data;
            },
            function (res) {//thất bại
                alert('Lỗi')
            }
        )
        $scope.dssp = []
        $http.get('../user/sp.json').then(function (res) {//thành công
            $scope.dssp = res.data;
        },
            function (res) {//thất bại
                alert('Lỗi')
            }
        )
        //thứ tự mặc định
        $scope.prop = 'name';
        $scope.change = function () {
        };
        //tìm kiếm
        $scope.keyword = "";
        $scope.stopPropagation = function (event) {
            event.stopPropagation();
        };
        angular.element(document).on('click', function () {
            $scope.keyword = "";
            $scope.$apply();
        });


        //lọc dmuc
        $scope.setCategoryFilter = function (loai) {
            $scope.categoryFilter = loai;
        };
        //trang
        $scope.limit = 6;
        $scope.page = 1;
        // page=1 -> begin=3
        // page=2 -> begin=6
        // page=n -> begin=(n-1)*3
        $scope.begin = ($scope.page - 1) * $scope.limit;
        $scope.chuyentrang = function (trang) {
            $scope.page = trang;
            $scope.begin = ($scope.page - 1) * $scope.limit;
        }
        $scope.totalpage = function () {
            return Math.ceil($scope.dssp.length / $scope.limit);
        }
        $scope.pagelist = function () {
            let arr = [];
            let totalpage = $scope.totalpage();
            for (let i = 1; i <= totalpage; i++) {
                arr.push(i)
            }
            return arr;
        }

        $scope.duoi2000 = false;
        $scope.trong3000 = false;
        $scope.tren3000 = false;

        $scope.tangchitiet = function (sp) {
            sp.quanlity++;
        };

        $scope.giamchitiet = function (sp) {
            if (sp.quanlity > 1) {
                sp.quanlity--;
            }
        };


        // giỏ hàng
        $scope.cart = localStorage.getItem('CART') ? JSON.parse(localStorage.getItem('CART')) : [];
        $scope.mua = function (sp) {
            if ($scope.cart.filter(i => i.id == sp.id).length == 0) {
                // sp.quanlity += sp.quantity;
                $scope.cart.push(sp);
            }
            else {
                $scope.cart.forEach(i => {
                    if (i.id == sp.id) {
                        i.quanlity++;
                    }
                });
            }
            sp.tong = sp.gia * sp.quanlity;
            localStorage.setItem('CART', JSON.stringify($scope.cart))

            console.log(sp)
        }
        $scope.tang = function (sp) {
            $scope.cart.forEach(function (item) {
                if (item.id === sp.id) {
                    item.quanlity++;
                    sp.tong = sp.gia * item.quanlity;
                    localStorage.setItem('CART', JSON.stringify($scope.cart));

                }
            });
            console.log(sp.quanlity);
        }
        $scope.giam = function (sp) {
            $scope.cart.forEach(function (item) {
                if (item.id === sp.id) {
                    item.quanlity--;
                    sp.tong = sp.gia * item.quanlity;
                    localStorage.setItem('CART', JSON.stringify($scope.cart));

                }
                if (sp.quanlity < 1) {
                    if (confirm('Bạn muốn xoá sản phẩm ?')) {
                        let index = $scope.cart.findIndex(i => i.id == sp.id);
                        $scope.cart.splice(index, 1);
                        localStorage.setItem('CART', JSON.stringify($scope.cart));
                    } else {
                        sp.quanlity = 1;
                        sp.tong = sp.gia * item.quanlity;
                        localStorage.setItem('CART', JSON.stringify($scope.cart));

                    }
                }
            });

            console.log(sp.quanlity);
        }
        $scope.xoa = function (id) {
            let index = $scope.cart.findIndex(i => i.id == id);
            $scope.cart.splice(index, 1);
            localStorage.setItem('CART', JSON.stringify($scope.cart))

        }
        $scope.xoahet = function () {
            $scope.cart = [];
            localStorage.setItem('CART', JSON.stringify($scope.cart))
        }
        $scope.sl = function () {
            return $scope.cart.reduce((x, y) => x + y.quanlity, 0)
        }
        $scope.tongtien = function () {
            return $scope.cart.reduce((x, y) => x + y.gia * y.quanlity, 0)
        }
       
        //xuất bill
        $scope.orderIds = localStorage.getItem('Bill') ? JSON.parse(localStorage.getItem('Bill')) : [];
        $scope.generateOrderId = function () {
            // Tạo mã đơn hàng ngẫu nhiên
            var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            var orderIdLength = 8;
            var orderId = '';
            for (var i = 0; i < orderIdLength; i++) {
                var randomIndex = Math.floor(Math.random() * characters.length);
                orderId += characters.charAt(randomIndex);
            }
            return orderId;
        };
        $scope.randomOrderCode = function () {
            $scope.randomOrderCode = $scope.generateOrderId();

            var newOrderId = $scope.randomOrderCode;
            var totalAmount = $scope.tongtien();

            var order = {
                madon:  newOrderId,
                tong: totalAmount
            };
            $scope.orderIds.push(order)
            localStorage.setItem('Bill', JSON.stringify($scope.orderIds));
            
            
            $scope.cart = [];
            return $scope.randomOrderCode;

           
        }
        // $scope.orderIds=[]
        // localStorage.setItem('Bill', JSON.stringify($scope.orderIds));
        $scope.doanhthu = function () {
            var tongdt = 0;
            angular.forEach($scope.orderIds, function (sp) {
                tongdt += sp.tong;
            });
            return tongdt;
        };
        console.log($scope.orderIds)


        //admin
        $scope.dmuc = ['Vàng 24k', 'Vàng 18k', 'Vàng Ý']
        // $scope.dmmoi='a'
        $scope.themdm = function () {
            if ($scope.dmmoi) {
                $scope.dmuc.push($scope.dmmoi);
                $scope.dmmoi = '';
                $scope.message = 'Thêm thành công';
            }
            console.log($scope.dmuc)
        }
        $scope.xoatk = function (id) {
            if (confirm('Bạn muốn xoá tài khoản ?')) {
                let index = $scope.accounts.findIndex(i => i.id == id);
                $scope.accounts.splice(index, 1);
                localStorage.setItem('USER', JSON.stringify($scope.accounts))
            }

        }
        console.log($scope.accounts)
        $scope.xoasp = function (id) {
            if (confirm('Bạn muốn xoá sản phẩm ?')) {
                let index = $scope.dssp.findIndex(i => i.id == id);
                $scope.dssp.splice(index, 1);
                // localStorage.setItem('USER', JSON.stringify($scope.accounts))
            }

        }
        $scope.xoadm = function (id) {
            if (confirm('Bạn muốn xoá danh mục ?')) {
                let index = $scope.dmuc.findIndex(i => i.id == id);
                $scope.dmuc.splice(index, 1);
                // localStorage.setItem('USER', JSON.stringify($scope.accounts))
            }

        }


    });

