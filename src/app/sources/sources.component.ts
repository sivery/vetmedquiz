import { Component, OnInit } from '@angular/core';
import {Constants} from "@app/data/constants";

class Source {
  session: string;
  label: string;
  url?: string;
}

@Component({
  selector: 'app-sources',
  templateUrl: './sources.component.html',
  styleUrls: ['./sources.component.scss']
})
export class SourcesComponent implements OnInit {

  public sources: Source[] = [
    {session: Constants.TOSSSSEP2019, label: 'Ancien candidat'},
    {session: Constants.GFORM2018, label: 'lespecialiste.be/ARES', url: 'https://www.lespecialiste.be/fr/actualites/socio-professionnel/seriez-vous-admis-en-medecine-aujourd-rsquo-hui-nbsp-testez-vos-connaissances-avec-l-rsquo-examen-d-rsquo-entree-nbsp.html'},
    {session: Constants.GFORM2017, label: 'lespecialiste.be/ARES', url: 'https://www.lespecialiste.be/fr/actualites/auriez-vous-reussi-l-examen-d-entree-en-medecine-testez-vos-connaissances.html'},
    {session: Constants.SEP2017, label: 'ARES', url: 'https://www.ares-ac.be/fr/?option=com_content&view=article&id=190&Itemid=321'},
    {session: Constants.JUL2017, label: 'ARES', url: 'https://www.ares-ac.be/fr/?option=com_content&view=article&id=190&Itemid=321'},
    {session: Constants.SEP2016, label: 'ARES', url: 'https://www.ares-ac.be/fr/?option=com_content&view=article&id=190&Itemid=321'},
    {session: Constants.JUL2016, label: 'ARES', url: 'https://www.ares-ac.be/fr/?option=com_content&view=article&id=190&Itemid=321'},
    {session: Constants.SEP2015, label: 'ARES', url: 'https://www.ares-ac.be/fr/?option=com_content&view=article&id=190&Itemid=321'},
    {session: Constants.JUL2015, label: 'ARES', url: 'https://www.ares-ac.be/fr/?option=com_content&view=article&id=190&Itemid=321'},
    {session: Constants.SEP2014, label: 'ARES', url: 'https://www.ares-ac.be/fr/?option=com_content&view=article&id=190&Itemid=321'},
    {session: Constants.JUL2014, label: 'ARES', url: 'https://www.ares-ac.be/fr/?option=com_content&view=article&id=190&Itemid=321'},
    {session: Constants.SEP2013, label: 'ARES', url: 'https://www.ares-ac.be/fr/?option=com_content&view=article&id=190&Itemid=321'},
    {session: Constants.JUL2013, label: 'ARES', url: 'https://www.ares-ac.be/fr/?option=com_content&view=article&id=190&Itemid=321'},
    {session: Constants.EXTRA, label: 'ARES', url: 'https://www.ares-ac.be/fr/?option=com_content&view=article&id=190&Itemid=321'}
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
