import { Component } from '@angular/core';
import {  NavController, NavParams, ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the CartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {
  CartItems: any[]=[];
  total:any;
  showEmptyCartMessage:boolean= false;
  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage,public viewCtrl: ViewController) {
    this.total=0.0;
    this.storage.ready().then(()=>{
      this.storage.get("cart").then((data)=>{
        this.CartItems=data;
        if(this.CartItems.length>0){
          this.CartItems.forEach((item,index)=>{
            this.total= this.total + (item.product.price * item.qty)
          })
        }
        else{
          this.showEmptyCartMessage=true;
        }
      })

    })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CartPage');
  }
  removeFromCart(item,i){
    let price= item.product.price;
    let qty= item.qty;
    this.CartItems.splice(i,1);
    this.storage.set("cart",this.CartItems).then(()=>{
      this.total= this.total -(price*qty);
    });
    if(this.CartItems.length ==0){
      this.showEmptyCartMessage=true;
    }
  }

  closeModal(){
    this.viewCtrl.dismiss();

  }
  checkout(){}

}
