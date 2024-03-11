import 'reflect-metadata';
import { DependencyContainer } from 'tsyringe';
import { CommunicationInjector } from './communication/communication.injector';

////////////////////////////////////////////////////////////////////////////////

export class ServiceInjector {

    static registerInjections(container: DependencyContainer) {

        CommunicationInjector.registerInjections(container);

    }

}
