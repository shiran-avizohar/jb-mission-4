import { Routes } from '@angular/router';
import { OperationsListComponent } from './components/operations-list/operations-list.component';
import { NewOperationComponent } from './components/new-operation/new-operation.component';  // Import your new component

export const routes: Routes = [
  { path: '', component: OperationsListComponent },  // Default route
  { path: 'new-operation', component: NewOperationComponent },  // Route for creating a new operation
];
