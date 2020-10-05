export interface Aquaria {
  id?: string;
  name: string;
  scientificName: string;
  minimumTankSize: string;
  temperament: string;
  details: string;
}

export interface CollectionCreateFormProps {
  visible: boolean;
  onSubmit: (values: any) => void;
  onCancel: () => void;
  mode: string;
  updateData?: any;
}
