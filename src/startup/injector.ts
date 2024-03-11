import 'reflect-metadata';
import { DependencyContainer } from 'tsyringe';

import { ServiceInjector } from '../services/service.injector';
//////////////////////////////////////////////////////////////////////////////////////////////////

export class Injector {

    static registerInjections(container: DependencyContainer) {

        //Service
        ServiceInjector.registerInjections(container);

    }

}