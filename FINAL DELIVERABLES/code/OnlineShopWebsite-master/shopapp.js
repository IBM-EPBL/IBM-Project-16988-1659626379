


var cartController = (function(){

    var Product = function(name,price,shortdescription,longdescription)
    {
        this.name = name;
        this.price = price;
        this.shortDescription = shortdescription;
        this.longDescription = longdescription;
        this.id = -1;
    };
    var CartProduct = function(product, quantity)
    {
        this.product = product;
        this.quantity = quantity;
    };
    data = {
        products :[],
        cartProducts :[], 
    };
    Product.prototype.generateID = function(){
        if(data.products.length === 0)
        {
            this.id = 0;
        }
        else
        {
            this.id = data.products.length;
        }
    };
    return{
        initialiseProduct: function(name,price,shortdescription,longdescription)
        {
            var aProduct = new Product(name,price,shortdescription,longdescription);
            aProduct.generateID();
            data.products.push(aProduct);
        },
        getProducts : function(){
            return data.products;
        },
        getSelected : function(){
            return data.selected;
        },
        getCartProducs : function(){
            return data.cartProducts;
        },
        getData: function()
        {
            return data;
        },
        initialiseCartProduct: function(obj)
        {
            var aCartProduct = new CartProduct(obj,1);
            data.cartProducts.push(aCartProduct);
        },
        checkIfAddedCart : function(selected)
        {
            isAlrCartProduct = false;
            for(var i = 0; i< this.getCartProducs().length;i++)
            {
                if(selected.id === this.getCartProducs()[i].product.id)
                {
                    isAlrCartProduct = true;
                    break;
                }
            }
            return isAlrCartProduct;
        },
        calculateTotal : function()
        {
            var priceString,price;
            var totalSum = 0;
            for(var i = 0; i< this.getCartProducs().length;i++)
            {
                priceString = (this.getCartProducs()[i].product.price).slice(1);
                price = parseFloat(priceString);
                price *= (this.getCartProducs()[i].quantity);
                totalSum += price;
            }
            return totalSum;
        },
        updateQuantityInCart: function(productID,operation)
        {
            for(var i = 0; i< this.getCartProducs().length;i++)
            {
                if(productID === this.getCartProducs()[i].product.id)
                {
                    if(operation === "plus")
                    {
                        this.getCartProducs()[i].quantity += 1;
                    }
                    else if(operation === "minus")
                    {
                        this.getCartProducs()[i].quantity -= 1;
                    }
                    else if(operation === "reset")
                    {
                        this.getCartProducs()[i].quantity = 1;
                    }
                    return (this.getCartProducs()[i]);
                }
            }
            
        },
        deleteProductFromCart: function(productID)
        {
            var index = -1;
            for(var i = 0; i< this.getCartProducs().length;i++)
            {
                if(productID === this.getCartProducs()[i].product.id)
                {
                    index = i;
                    break;
                }
            }
            this.getCartProducs().splice(index,1);

        },
        clearCart: function()
        {
            this.getCartProducs().splice(0,this.getCartProducs().length);
        }
    };


})();

var UIController = (function(){
    var imgLinks = ["tshirtblack.jpg","tshirtgreen.jpg","tshirtred.jpeg","tshirtfila.jpg","tshirtlgbt.jpeg","tshirtlove.jpeg","tshirtmarine.jpeg","tshirtowl.jpg","tshirtturq.jpeg","blousebeach.jpeg","blousefloral.jpeg","blouseleopard.jpeg","blousepalmleaves.jpeg"];
    var DOMstrings = {
        selectContainer : ".modal",
        closeButton : ".close-button",
        selectButton : ".trigger",
        selectContainerCSS: "show-modal",
        selectProduct : ".modal-content",
        cartButton : ".cartbutton",
        cartProducts : ".cartProducts",
        totalContainer : "total",
        yesButton: ".yesbutton",
        noButton: ".nobutton",
        quantityContainer : ".qty-td",
        cartRowClass : ".qty",
        totalID : "total"
    };


    var showSelectPage = function(newHtml){

        element = DOMstrings.selectContainer;
        // display the select container & styling
        document.querySelector(element).insertAdjacentHTML('beforeend',newHtml);
        document.querySelector(element).classList.add(DOMstrings.selectContainerCSS);


    }


    return {
        showSelectContainer: function(obj)
        {
            html = '<div class="modal-content" id = "modal-%id%"><span class="close-button">&times;</span><div><img src="%imgLink%"><div class = "product_name">%name%</div><div class = "product_price">%price%</div><div class = "product_description">%description%</div><div class = "product_id">%id2%</div><a href="#" class="selectbutton cartbutton" id ="cart">Add to cart</a></div></div>';
            newHtml = html.replace('%id%',obj.id);
            newHtml = newHtml.replace('%imgLink%',imgLinks[obj.id]);
            newHtml = newHtml.replace('%name%',obj.name);
            newHtml = newHtml.replace('%price%', obj.price);
            newHtml = newHtml.replace('%description%', obj.longDescription);
            newHtml = newHtml.replace('%id2%',obj.id);
            newHtml = newHtml.replace('%nameconfirm', obj.name);
            showSelectPage(newHtml);      
        
    
        },
        getDOMStrings : function()
        {
            return DOMstrings;
        },
        showCartConfirm : function(name)
        {
            UIController.showProductsPage();
            html = '<div class="modal-content" id = "confirm-%id%"><span class="close-button">&times;</span><div><div class = "product_name">%name% has been added to cart.</div></div></div>';
            newHtml = html.replace('%name%',"Product");
            showSelectPage(newHtml);
        },
        showCartProduct : function(obj)
        {
            element = DOMstrings.cartProducts;
            html='<tr class = "qty" id = "qty-%id1%"><td>%name%</td><td>%id%</td><td class = "qty-td"><span class="dot" id = "plus">+</span>%qty%<span class="dot" id = "minus">-</span></td><td>%price%</td></tr>';
            newHtml = html.replace('%id%',obj.product.id);
            newHtml = newHtml.replace('%id1%',obj.product.id);
            newHtml = newHtml.replace('%name%',obj.product.name);
            newHtml = newHtml.replace('%price%', obj.product.price);
            newHtml = newHtml.replace('%qty%',obj.quantity);
            document.querySelector(element).insertAdjacentHTML('beforeend',newHtml);

        },
        showAlrAddedCartMsg : function()
        {
            UIController.showProductsPage();
            html = '<div class="modal-content" id = "confirm-%id%"><span class="close-button">&times;</span><div><div>This product has already been added to cart.</div></div></div>';
            showSelectPage(html);   
        },

        showTotalOfCart : function(total)
        {
            element = DOMstrings.cartProducts;
            html = '<tr id = "total"><td>Total:</td><td colspan="3">%total%</td></tr>';
            totalWithMoneySign = '$'+total
            newHtml = html.replace('%total%',totalWithMoneySign);
            document.querySelector(element).insertAdjacentHTML('beforeend',newHtml);     
        },

        removeShowTotalOfCart : function()
        {
            var totalContainer = document.getElementById(DOMstrings.totalContainer);
            totalContainer.remove();
        },

        showNewQuantity: function(el,newQty)
        {
            html = '<span class="dot" id = "plus">+</span>%qty%<span class="dot" id = "minus">-</span>';
            newHtml = html.replace('%qty%',newQty);
            el.innerHTML = newHtml;
        },
        showCartDelete: function(obj)
        {
            html = '<div class="modal-content" id = "delete-%id%"><div>Do you want to remove %name% from cart?</div><a href="#" class="selectbutton" id = "yesbutton">Yes</a><a href="#" class="selectbutton" id = "nobutton">No</a></div>';
            html = html.replace('%id%', obj.product.id)
            html = html.replace('%name%',obj.product.name);
            showSelectPage(html);
        },
        showOrderConfirm : function()
        {
            html = '<div class="modal-content"><span class="close-button">&times;</span><div>Your order has been placed.</div></div>';
            showSelectPage(html);
        },
        showOrderCancel: function()
        {
            html = '<div class="modal-content"><span class="close-button">&times;</span><div>Your order has been cancelled.</div></div>';
            showSelectPage(html);
        },
        showProductsPage :function(){

            var element = DOMstrings.selectContainer;
            // remove the styling
            document.querySelector(element).classList.remove(DOMstrings.selectContainerCSS);
            // remove the select container
            var modalContent = document.querySelector(DOMstrings.selectProduct);
            modalContent.remove();
    
        },
        removeCartProductRow : function(aString)
        {
            var cartProductRow = document.getElementById(aString);
            cartProductRow.remove();
            
        },
        removeAllCartRows : function()
        {
            var allCartRows = document.querySelectorAll(DOMstrings.cartRowClass);
            var totalRow = document.getElementById(DOMstrings.totalID);
            totalRow.remove();
            for(var i = 0; i<allCartRows.length;i++)
            {
                var itemToDelete = allCartRows[i];
                itemToDelete.remove();
            }
        }


    };



})();

var controller = (function(cartCtrl,UICtrl){
    var setUpEventListener = function(){


        if (window.location.pathname === "/C:/Users/S510/Documents/GitHub/complete-javascript-course/6-budgety/final/Online%20Shop/shopindex.html") {
            // Place the logic pertaining to the page with title 'my_page_title' here...
        backToHomeInHome();
        var DOM = UICtrl.getDOMStrings();
        var selectButtons = document.querySelectorAll(DOM.selectButton); 
        // set up event listeners for all select buttons
        for(var i = 0; i < selectButtons.length ; i++)
        {
            selectButtons[i].addEventListener('click', ctrlShowSelect);
            //ctrlShowSelect
        
        }
        // set up event listener for add to cart button and close button
        document.body.addEventListener('click', ctrlEventListenerInHomePage);
        // change close Button to this kind also


        // set up event listener for view cart button

        document.querySelector(".button").addEventListener('click', ctrlShowCart);
        }
    
        else if(window.location.pathname === "/C:/Users/S510/Documents/GitHub/complete-javascript-course/6-budgety/final/Online%20Shop/cartindex.html"){
            
            // retrieve cartProducts and display cartProducts on UI
            loadCart();

            // set up event listener for Back to Products Page button and plus and minus button
            document.body.addEventListener('click', ctrlEventListenerInCartPage);

            // Calculate total cost of all the cart products & display on UI
            ctrlShowTotal();


        }



    
    };


    var ctrlShowSelect = function()
    {
        // get id of product
        var idString = event.target.parentNode.id;
        var strings = idString.split("-");
        var idNum = parseInt(strings[1]);
        
        // Get object from data structure
        var obj = cartCtrl.getProducts()[idNum];
        // Display product on UI
        UICtrl.showSelectContainer(obj);
        // add to selected in data structure       
        cartCtrl.getData().selected = obj;


    };
    var ctrlEventListenerInHomePage = function()
    {
        if(event.srcElement.id === "cart")
        {
            // show confirmation
            UICtrl.showCartConfirm();

            // get the Selected Product
            var selectedProduct = cartCtrl.getSelected();

            // add the selected Product cartProducts data structure
            // how to handle things that have already been added to cart before?
            if(cartCtrl.checkIfAddedCart(selectedProduct))
            {
                // UI to show already added to cart message
                UICtrl.showAlrAddedCartMsg();
            }
            else
            {
                cartCtrl.initialiseCartProduct(selectedProduct);
            }

        }
        else if(event.srcElement.className === "close-button")
        {
            // set up event listener for close button
            (event.srcElement).addEventListener('click',UICtrl.showProductsPage());
        }
    }
    var loadCart = function(){
        // retrieve the cartProducts object from session storage
        var cartPdts = JSON.parse(sessionStorage.getItem('storeObj'));
        cartCtrl.getData().cartProducts = cartPdts;

        // display on UI cart products
        for (var i = 0; i<cartCtrl.getCartProducs().length;i++)
        {
            UICtrl.showCartProduct(cartCtrl.getCartProducs()[i]);
        }
    };

    var ctrlShowTotal = function()
    {
        // calculate Total
        var total = cartCtrl.calculateTotal();

        // display the Total on UI
        UICtrl.showTotalOfCart(total);
    };

    var ctrlShowCart = function(){
        // store the cartProducts object in session storage
        sessionStorage.setItem('storeObj', JSON.stringify(cartController.getData().cartProducts));

    };

    var backToHomeInHome = function()
    {
        // retrieve the cartProducts object from session storage
        // so that user can switch between pages and cartProducts object remains constant
        var cartPdts = JSON.parse(sessionStorage.getItem('storeObj'));
        if(cartPdts != null)
            cartController.getData().cartProducts = cartPdts;
    };
    
    var getProductIDfromElement= function(aString)
    {
        var productIDArr = aString.split("-");
        var productIDInt = parseInt(productIDArr[1]);
        return productIDInt;
    };
    var ctrlCartDelete = function(id)
    {
        // delete the cartProduct from data structure
        cartCtrl.deleteProductFromCart(id);

        // remove warning page from UI
        UICtrl.showProductsPage();

        var cartProductIDNameCSS = "qty-"+ id;

        // delete the cartProduct from UI
        UICtrl.removeCartProductRow(cartProductIDNameCSS);

        // redo the total
        handleTotalPrice();
        


    };
    var handleTotalPrice =function(){
        UICtrl.removeShowTotalOfCart();
        ctrlShowTotal();

    }

    var handleUpdateQuantity= function(event,operation)
    {
        var productIDString = event.srcElement.parentNode.parentNode.id;
        var productIDInt = getProductIDfromElement(productIDString);

        // update quantity of cartProduct in data structure
        var cartProduct = cartCtrl.updateQuantityInCart(productIDInt,operation);
        
        // update quantity of cartProduct in UI
        var qtyContainer = event.srcElement.parentNode;

        handleTotalPrice();

    
      
        UICtrl.showNewQuantity(qtyContainer,cartProduct.quantity);
        if(cartProduct.quantity <= 0)
        {
                // show confirm delete?
                UICtrl.showCartDelete(cartProduct);


                // if no,
                // increase back the qty in datastructure to 1
                // update qty in UI

        }
    };
    var CtrlResetCartQuantity = function(cartProductID)
    {
            // update data structure
            cartCtrl.updateQuantityInCart(parseInt(cartProductID),"reset");


            // update total in data structure
            cartCtrl.calculateTotal();

            // update total in UI
            handleTotalPrice();

            // remove warning page from UI
            UICtrl.showProductsPage();

            var allQuantities = document.querySelectorAll(".qty-td");
            for(var i = 0; i<allQuantities.length;i++)
            {
                if(allQuantities[i].parentNode.id === ("qty-"+cartProductID))
                {
                    UICtrl.showNewQuantity(allQuantities[i],1);
                    break;
                }
            }
    }


    var ctrlEventListenerInCartPage = function(event)
    {
        if(event.srcElement.id === "backtoproduct")
        {
            ctrlShowCart();
            // remove Total container in Cart Page
            // this ensures that there are not multiple rows of Total Container
            UICtrl.removeShowTotalOfCart();
        }
        else if(event.srcElement.id === "plus" )
        {
            
            handleUpdateQuantity(event,"plus");
                
            
        }
        else if (event.srcElement.id === "minus")
        {

            handleUpdateQuantity(event,"minus");
        
        }
        else if(event.srcElement.id === "yesbutton")
        {
            var cartProductID = ((event.srcElement.parentNode.id).split("-"))[1];
            ctrlCartDelete(cartProductID);

        }
        else if(event.srcElement.id === "nobutton")
        {
            var cartProductID = ((event.srcElement.parentNode.id).split("-"))[1];

            CtrlResetCartQuantity(cartProductID);


        }
        else if(event.srcElement.id === "cancelorder")
        {
            // delete cartProducts in data structure

            cartCtrl.clearCart();

            // delete cartProducts from UI
            UICtrl.removeAllCartRows();
            // show order cancel message
            UICtrl.showOrderCancel();
        }
        else if(event.srcElement.id === "placeorder")
        {
            // delete cartProducts in data structure

            cartCtrl.clearCart();

            // delete cartProducts from UI
            UICtrl.removeAllCartRows();
            // show order confirm message
            UICtrl.showOrderConfirm();

        }
        else if(event.srcElement.className === "close-button")
        {
            // set up event listener for close button
            (event.srcElement).addEventListener('click',UICtrl.showProductsPage());
        }
    
    };


    

    return{
        init: function(){
            // Add products into data structure
            cartCtrl.initialiseProduct("Simple black Tee shirt","$25","100% cotton, Made in UK","100% cotton, Made in UK, slim fit and loosefit, One size");
            cartCtrl.initialiseProduct("Simple green Tee shirt","$25","100% cotton, Made in UK","100% cotton, Made in UK, slim fit and loosefit, One size");
            cartCtrl.initialiseProduct("Simple red Tee shirt","$25","100% cotton, Made in UK","100% cotton, Made in UK, slim fit and loosefit, One size");
            cartCtrl.initialiseProduct("Fila logo Tee shirt","$45","100% cotton, Original Fila Brand, Made in UK","100% cotton, Original Fila Brand, Made in UK, loosefit, One size");
            cartCtrl.initialiseProduct("LGBT logo Tee shirt","$29","100% cotton, Made in UK","100% cotton, Made in UK, slim fit and loosefit, One size");
            cartCtrl.initialiseProduct("Love logo Tee shirt","$29","100% cotton, Made in UK","100% cotton, Made in UK, slim fit and loosefit, One size");
            cartCtrl.initialiseProduct("Marine logo Tee shirt","$35","100% cotton, Made in UK","100% cotton, Made in UK, slim fit and loosefit, One size");
            cartCtrl.initialiseProduct("Owl logo Tee shir","$35","100% cotton, Made in UK","100% cotton, Made in UK, slim fit and loosefit, One size");
            cartCtrl.initialiseProduct("Simple Turqoise Tee shirt","$25","100% cotton, Made in UK","100% cotton, Made in UK, slim fit and loosefit, One size");
            cartCtrl.initialiseProduct("Beach Print Blouse","$35","100% cotton, Made in UK","100% cotton, Made in UK,loosefit,Designed by locals, One size");
            cartCtrl.initialiseProduct("Floral Print Blouse","$35","100% cotton, Made in UK","100% cotton, Made in UK, slim fit, One size");
            cartCtrl.initialiseProduct("Leopard Print Blouse","$35","100% cotton, Made in UK","100% cotton, Made in UK, slim fit, One size");
            cartCtrl.initialiseProduct("Palm Leaves Print Blouse","$35","100% cotton, Made in UK","100% cotton, Made in UK,loosefit,Designed by locals, One size");
            setUpEventListener();

        }

    };

})(cartController,UIController);

controller.init();
