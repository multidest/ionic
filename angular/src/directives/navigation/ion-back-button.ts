import { Directive, HostListener, Optional } from '@angular/core';
import { AnimationBuilder } from '@ionic/core';

import { Config } from '../../providers/config';
import { NavController } from '../../providers/nav-controller';

import { IonRouterOutlet } from './ion-router-outlet';

@Directive({
  selector: 'ion-back-button',
  inputs: ['defaultHref', 'animation'],
})
export class IonBackButtonDelegate {

  defaultHref: string | undefined | null;
  animation?: AnimationBuilder;

  constructor(
    @Optional() private routerOutlet: IonRouterOutlet,
    private navCtrl: NavController,
    private config: Config
  ) {}

  /**
   * @internal
   */
  @HostListener('click', ['$event'])
  onClick(ev: Event) {
    const defaultHref = this.defaultHref || this.config.get('backButtonDefaultHref');

    if (this.routerOutlet && this.routerOutlet.canGoBack()) {
      this.navCtrl.setDirection('back', undefined, undefined, this.animation);
      this.routerOutlet.pop();
      ev.preventDefault();
    } else if (defaultHref != null) {
      this.navCtrl.navigateBack(defaultHref, { animationBuilder: this.animation });
      ev.preventDefault();
    }
  }
}
