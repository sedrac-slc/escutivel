interface PersonProps {
  id?: string
  name: string
  birthDate: Date
  gender: string
  birthPlace?: string // Comuna/Município/Província
  province?: string
  municipality?: string
  commune?: string
  address?: string
  phoneNumber?: string
  baptismDate?: Date
  baptismChurch?: string
}

export class Person {
  public id: string;
  public name: string
  public birthDate: Date
  public gender: string
  public birthPlace?: string
  public province?: string
  public municipality?: string
  public commune?: string
  public address?: string
  public phoneNumber?: string
  public baptismDate?: Date
  public baptismChurch?: string

  constructor(props: PersonProps) {
    this.name = props.name
    this.birthDate = props.birthDate
    this.gender = props.gender
    this.birthPlace = props.birthPlace
    this.province = props.province
    this.municipality = props.municipality
    this.commune = props.commune
    this.address = props.address
    this.phoneNumber = props.phoneNumber
    this.baptismDate = props.baptismDate
    this.baptismChurch = props.baptismChurch
    this.id = props.id ? props.id : ''
  }

  get age(): number {
    const today = new Date()
    const age = today.getFullYear() - this.birthDate.getFullYear()
    const monthDiff = today.getMonth() - this.birthDate.getMonth()
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < this.birthDate.getDate())) {
      return age - 1
    }
    
    return age
  }
}