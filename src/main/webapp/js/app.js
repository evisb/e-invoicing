function appController($scope) {

    $scope.printMode = false;

    var sample_invoice = {
        tax: 21.00,
        invoice_number: 15130871,
		invoice_date: "02-November-2015",
        customer_info: {
            name: "Mr. John Doe",
            web: "http://www.jdoe-cust.com",
            address: "Bourbon Avenue 37",
            city: "Redwood Shores, CA 94065",
            country: "United States"
        },
        company_info: {
            name: "Comp NV/SA",
            web: "http://www.compx-demo.com",
            address: "Marktstraat 195",
            city: "1000, Brussels",
            country: "Belgium"
        },
        items: [{
            qty: 10,
            description: 'Mouse pad',
            cost: 9.95
        },
        {
            qty: 1,
            description: 'Computer screen',
            cost: 100.00
        }]
    };

    if (localStorage["invoice"] == "" || localStorage["invoice"] == null) {
        $scope.invoice = sample_invoice;
    } else {
        $scope.invoice = JSON.parse(localStorage["invoice"]);
    }
    $scope.addItem = function () {
        $scope.invoice.items.push({
            qty: 0,
            cost: 0,
            description: ""
        });
    }

    $scope.removeItem = function (item) {
        $scope.invoice.items.splice($scope.invoice.items.indexOf(item), 1);
    }

    $scope.invoice_sub_total = function () {
        var total = 0.00;
        angular.forEach($scope.invoice.items, function (item) {
            total += (item.qty * item.cost);
        });
        return total;
    }
    $scope.calculate_tax = function () {
        return (($scope.invoice.tax * $scope.invoice_sub_total()) / 100);
    }
    $scope.calculate_grand_total = function () {
        localStorage["invoice"] = JSON.stringify($scope.invoice);
        return $scope.calculate_tax() + $scope.invoice_sub_total();
    }

    $scope.printInfo = function () {
        window.print();
    }
	
    $scope.clearLocalStorage = function () {
        var confirmClear = confirm("Are you sure you would like to clear the invoice?");
        if (confirmClear) {
            localStorage["invoice"] = "";
            $scope.invoice = sample_invoice;
        }
    }


};

angular.module('jqanim', []).directive('jqAnimate', function () {
    return function (scope, instanceElement) {
        setTimeout(function () {
            instanceElement.show('slow');
        }, 0);
    }
});

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#company_logo').attr('src', e.target.result);
        }
        reader.readAsDataURL(input.files[0]);
    }
}

$(document).ready(function () {
    $("#invoice_number").focus();
    $("#imgInp").change(function () {
        readURL(this);
    });
});