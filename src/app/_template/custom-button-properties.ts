import {RestApi} from '../services/rest-api.enum';

export interface CustomButtonProperties {
  testo?: string;
  width?: number;
  height?: number;
  colour?: string;
  textColour?: string;
  type?: string;
  nameMaterialIcon?: string;
  buttonTypeBootstrap?: string;
  url?: string;
  urlRestApi?: string;
  restApi?: RestApi;
  disabled?: boolean;
}
