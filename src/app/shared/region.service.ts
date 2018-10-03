import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import {IConstellation, IRegion, ISystem} from "../interfaces/IRegions";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class RegionService {

  private uri = "https://crest-tq.eveonline.com/regions/";
  private uriSys: string = "";
  public Regions: Array<IRegion>;

  public loading: boolean;

  public e: Array<Object>;
  result: Object;

  private baseUri: string;
  private uriEnd: string;
  public regions: string[];
  private regionsUri: string;
  private constellation: IConstellation;
  constructor(private http: HttpClient) {
    this.baseUri = "https://esi.tech.ccp.is/latest/universe";
    this.uriEnd = "/?datasource=tranquility&language=en-us";
    this.regionsUri = "https://esi.tech.ccp.is/latest/universe/regions/?datasource=tranquility";
    this.Regions = new Array<IRegion>();
  }
  public getSystemsF(region: IRegion, systems){

    region.constellations.forEach(constel => {
      this.getConstellations(constel).subscribe(answer => {
        answer.systems.forEach(systemid => {
            this.getSystem2(systemid).subscribe(system => {
              systems.push(system);
            });
        });
      });


    })
  }
  private getSystem2(systemid: number): Observable<ISystem>{
    const uri  = this.baseUri + "/systems/" + systemid + this.uriEnd;
    return this.http.get<ISystem>(uri);
  }
  private getConstellations(constel: number): Observable<IConstellation>{
    const uri  = this.baseUri + "/constellations/" + constel + this.uriEnd;
      return this.http.get<IConstellation>(uri);
  }
  public getRegions(): Observable<any> {
    if (this.regions == null)
      return this.http.get(this.regionsUri);
    else
      return null;
  }

  getRegionContent(id: string): Observable<IRegion> {
    this.uri  = this.baseUri + "/regions/" + id + this.uriEnd;
    return this.http.get<IRegion>(this.uri);
  }






}
