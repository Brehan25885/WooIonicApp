import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import * as WC from 'woocommerce-api';
import  { ProductDetailsPage } from "../product-details/product-details";
@Component({
  selector: 'page-products-by-category',
  templateUrl: 'products-by-category.html',
})
export class ProductsByCategoryPage {
  WooCommerce:any;
  products:any[];
  page:number;
  category: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.page=1;
    this.category=this.navParams.get('category');

    this.WooCommerce=WC({
      url:"http://woo.local",
      consumerKey:"ck_0f16b2775f630bc99d6dd76f8559726dfa2efaaf",
      consumerSecret:"cs_674fe83b085f60c1b42e17d3449f2b5429dbd2cc"

    });

    this.WooCommerce.getAsync("products?filter[category]="+ this.category.slug).then((data)=>{console.log(data);
      this.products= JSON.parse(data.body).products;
    },(err)=>{
      console.log(err);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductsByCategoryPage');
  }
  openProductPage(product){
    this.navCtrl.push(ProductDetailsPage,{"product":product})
   }
}
