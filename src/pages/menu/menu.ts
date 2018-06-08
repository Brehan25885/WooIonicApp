import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,UrlSerializer,ModalController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { ProductsByCategoryPage } from '../products-by-category/products-by-category';
import { SignupPage } from '../signup/signup';
import { LoginPage } from '../login/login';
import { Storage } from '@ionic/storage';
import { CartPage } from '../cart/cart';

import * as WC from 'woocommerce-api';

@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {
  homePage:any;
  WooCommerce:any;
  categories:any[];
  loggedIn: boolean;
 user: any;
  @ViewChild('content') childNavCtrl: NavController;



  constructor(public navCtrl: NavController, public navParams: NavParams,public storage: Storage, public modalCtrl: ModalController) {
    this.homePage= HomePage;
    this.user={};
    this.categories=[];
    this.WooCommerce=WC({
      url:"http://woo.local",
      consumerKey:"ck_0f16b2775f630bc99d6dd76f8559726dfa2efaaf",
      consumerSecret:"cs_674fe83b085f60c1b42e17d3449f2b5429dbd2cc"

    });

    this.WooCommerce.getAsync("products/categories").then((data)=>{console.log(data.body);
      console.log(JSON.parse(data.body).product_categories);
      let temp:any[]=JSON.parse(data.body).product_categories;
      for (let i =0;i<temp.length;i++){
        if(temp[i].parent==0){
          if(temp[i].slug == "accessories"){
            temp[i].icon = "images";
          }
          if(temp[i].slug == "Hoodies"){
            temp[i].icon = "alert";
          }
          if(temp[i].slug == "tshirts"){
            temp[i].icon = "shirt";
          }
          if(temp[i].slug == "uncategorized"){
            temp[i].icon = "help";
          }
          this.categories.push(temp[i]);
        }
      }

    },(err)=>{
      console.log(err);
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
  }
  openCategoryPage(category){
    
    this.childNavCtrl.setRoot(ProductsByCategoryPage,{"category":category})
  }
  ionViewDidEnter() {
    this.storage.ready().then(()=>{
      this.storage.get("userLoginInfo").then((userLoginInfo)=>{
        if(userLoginInfo != null){
          console.log("User logged in ....");
          this.user=userLoginInfo.user;
          console.log(this.user);
          this.loggedIn=true;
        }
        else{
          console.log("No user found.");
          this.user = {};
          this.loggedIn = false;          
        }
      })   
    })
  }
  openPage(pageName: string){
    if (pageName == "signup") {
      this.navCtrl.push(SignupPage);
}
if (pageName == "login") {
  this.navCtrl.push(LoginPage);
}

if(pageName=="cart"){
  let modal=this.modalCtrl.create(CartPage);
  modal.present();
}
if(pageName == "logout"){
  this.storage.remove("userLoginInfo").then(()=>{
    this.user = {};
    this.loggedIn = false;             
  })
}
  }

}
