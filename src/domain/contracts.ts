import type { Money } from './money';

// Contratos de diseño: no sustituyen validación de entrada ni persistencia.
export type EntityId = string;
export interface Revisioned {
  readonly id: EntityId;
  readonly revision: number;
}
export type Provenance =
  | { readonly kind: 'manual'; readonly reviewed: true }
  | {
      readonly kind: 'ocr';
      readonly captureId: EntityId;
      readonly rawText: string;
      readonly reviewed: boolean;
      readonly correctedText: string | null;
    };
export interface Bill extends Revisioned {
  readonly title: string;
  readonly currency: string;
  readonly scale: number;
  readonly createdAt: string;
  readonly updatedAt: string;
}
export interface Participant extends Revisioned {
  readonly billId: EntityId;
  readonly name: string;
  readonly position: number;
}
export interface ReceiptCapture extends Revisioned {
  readonly billId: EntityId;
  readonly localUri: string;
  readonly position: number;
  readonly status: 'pending' | 'recognized' | 'reviewed' | 'failed';
}
export interface ReceiptItem extends Revisioned {
  readonly billId: EntityId;
  readonly description: string;
  readonly quantity: number;
  readonly unitPrice: Money;
  readonly source: Provenance;
}
export type ChargeTarget =
  | { readonly kind: 'bill' }
  | { readonly kind: 'item'; readonly itemId: EntityId };
export interface ReceiptTax extends Revisioned {
  readonly billId: EntityId;
  readonly target: ChargeTarget;
  readonly label: string;
  readonly treatment: 'included' | 'additional';
  readonly amount: Money;
  readonly source: Provenance;
}
export interface ReceiptDiscount extends Revisioned {
  readonly billId: EntityId;
  readonly target: ChargeTarget;
  readonly treatment: 'included' | 'additional';
  readonly amount: Money;
  readonly source: Provenance;
}
export interface Assignment extends Revisioned {
  readonly billId: EntityId;
  readonly itemId: EntityId;
  readonly unitIndex: number;
  readonly mode: 'individual' | 'shared';
}
export interface AssignmentShare extends Revisioned {
  readonly assignmentId: EntityId;
  readonly participantId: EntityId;
  readonly weight: number;
}
export type ServiceCharge =
  | { readonly kind: 'none' }
  | { readonly kind: 'included'; readonly receiptTaxId: EntityId }
  | {
      readonly kind: 'additional';
      readonly amount: Money;
      readonly source: Provenance;
    };
export interface CalculationSnapshot extends Revisioned {
  readonly billId: EntityId;
  readonly billRevision: number;
  readonly schemaVersion: number;
  readonly engineVersion: string;
  readonly inputRevisions: Readonly<Record<EntityId, number>>;
  readonly service: ServiceCharge;
  readonly total: Money;
  readonly participantTotals: Readonly<Record<EntityId, Money>>;
  readonly rounding: 'largest-remainder-stable-id';
}
