import { Person } from "./person";

interface ScoutProps {
  person: Person
  groupNumber?: string // Número do Agrupamento
  unitName?: string // Nome da Unidade Escutista
  previousScoutUnit?: string // Unidade Escutista anterior
  previousAssociation?: string // Outra associação anterior
  proposalNumber?: string // Número da proposta
  registrationDate?: Date // Data de aprovação como aspirante
  matriculationNumber?: string // Número de matrícula
  hasContagiousDisease?: boolean // Sofre de doença contagiosa
  hasPhysicalRobustness?: boolean // Tem robustez física necessária
  medicalObservations?: string // Observações médicas
}

export class Scout {
  protected id: number;
  public person: Person
  public groupNumber?: string
  public unitName?: string
  public previousScoutUnit?: string
  public previousAssociation?: string
  public proposalNumber?: string
  public registrationDate?: Date
  public matriculationNumber?: string
  public hasContagiousDisease?: boolean
  public hasPhysicalRobustness?: boolean
  public medicalObservations?: string

  constructor(props: ScoutProps) {
    this.person = props.person
    this.groupNumber = props.groupNumber
    this.unitName = props.unitName
    this.previousScoutUnit = props.previousScoutUnit
    this.previousAssociation = props.previousAssociation
    this.proposalNumber = props.proposalNumber
    this.registrationDate = props.registrationDate
    this.matriculationNumber = props.matriculationNumber
    this.hasContagiousDisease = props.hasContagiousDisease
    this.hasPhysicalRobustness = props.hasPhysicalRobustness
    this.medicalObservations = props.medicalObservations
    this.id = 0
  }

  get isActive(): boolean {
    return !!this.matriculationNumber && !!this.registrationDate
  }

  get medicallyApproved(): boolean {
    return !this.hasContagiousDisease && this.hasPhysicalRobustness === true
  }
}