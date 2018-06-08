import { Component,ViewChild } from '@angular/core';
import { NavController ,Slides} from 'ionic-angular';
import { ProductDetailsPage } from '../product-details/product-details';

import * as WC from 'woocommerce-api';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
WooCommerce:any;
products:any[];
//moreProducts:any[];
page:number;

@ViewChild('productSlides')productSlides:Slides;

  constructor(public navCtrl: NavController) {
    //this.loadMoreProducts(null);
      this.page=2;
      
      this.WooCommerce=WC({
        url:"http://woo.local",
        consumerKey:"ck_0f16b2775f630bc99d6dd76f8559726dfa2efaaf",
        consumerSecret:"cs_674fe83b085f60c1b42e17d3449f2b5429dbd2cc"

      });
      this.WooCommerce.getAsync("products").then((data)=>{console.log(data);
        this.products= JSON.parse(data.body).products;
      },(err)=>{
        console.log(err);
      });
    }
   ionViewDidLoad(){
     setInterval(()=>{
       if(this.productSlides.getActiveIndex()==this.productSlides.length()-1)
        this.productSlides.slideTo(0);

      this.productSlides.slideNext();
     
     },3000)
   }   /*
   loadMoreProducts(event){
     if (event==null){
      this.page=2;
      this.moreProducts = [];
     }
     
      else
      this.page++

    this.WooCommerce.getAsync("products?page=" + this.page).then((data)=>{console.log(data.body);
      this.moreProducts= this.moreProducts.concat(JSON.parse(data.body).products);
      if(event !=null){
        event.complete;
      }
    },(err)=>{
      console.log(err);
    });
   }
  */

 openProductPage(product){
  this.navCtrl.push(ProductDetailsPage,{"product":product})
 }
}
