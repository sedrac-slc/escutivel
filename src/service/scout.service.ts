import { CrudService } from "@/interface/crud.service";
import { Scout } from "@/models/scout";
import { supabase } from "@/supabase";

export class ScoutService implements CrudService<Scout> {
  private tableName = 'scouts';

  async findAll(): Promise<Scout[]> {
    try {
      const { data, error } = await supabase
        .from(this.tableName)
        .select(`*, persons (*)`)
        .order('created_at', { ascending: false });

      if (error) throw error;

      return (data || []).map(item => {
        const scout = new Scout({
          id: item.id,
          person: item.person,
          groupNumber: item.group_number,
          unitName: item.unit_name,
          previousScoutUnit: item.previous_scout_unit,
          previousAssociation: item.previous_association,
          proposalNumber: item.proposal_number,
          registrationDate: item.registration_date ? new Date(item.registration_date) : undefined,
          matriculationNumber: item.matriculation_number,
          hasContagiousDisease: item.has_contagious_disease,
          hasPhysicalRobustness: item.has_physical_robustness,
          medicalObservations: item.medical_observations
        });
        return scout;
      });
    } catch (error) {
      console.error('Erro ao buscar escuteiros:', error);
      throw new Error('Não foi possível buscar os escuteiros');
    }
  }

  async create(data: Scout): Promise<Scout> {
    try {

      const { data: inserted, error } = await supabase
        .from(this.tableName)
        .insert({
          person_id: data.person.id,
          group_number: data.groupNumber,
          unit_name: data.unitName,
          previous_scout_unit: data.previousScoutUnit,
          previous_association: data.previousAssociation,
          proposal_number: data.proposalNumber,
          registration_date: data.registrationDate?.toISOString(),
          matriculation_number: data.matriculationNumber,
          has_contagious_disease: data.hasContagiousDisease,
          has_physical_robustness: data.hasPhysicalRobustness,
          medical_observations: data.medicalObservations
        })
        .select(`*, persons (*)`)
        .single();

      if (error) throw error;

      const scout = new Scout({
        id: inserted.id,
        person: inserted.person,
        groupNumber: inserted.group_number,
        unitName: inserted.unit_name,
        previousScoutUnit: inserted.previous_scout_unit,
        previousAssociation: inserted.previous_association,
        proposalNumber: inserted.proposal_number,
        registrationDate: inserted.registration_date ? new Date(inserted.registration_date) : undefined,
        matriculationNumber: inserted.matriculation_number,
        hasContagiousDisease: inserted.has_contagious_disease,
        hasPhysicalRobustness: inserted.has_physical_robustness,
        medicalObservations: inserted.medical_observations
      });
      return scout;
    } catch (error) {
      console.error('Erro ao criar escuteiro:', error);
      throw new Error('Não foi possível criar o escuteiro');
    }
  }

  async update(data: Scout, id: string): Promise<Scout> {
    try {
      const { data: updated, error } = await supabase
        .from(this.tableName)
        .update({
          group_number: data.groupNumber,
          unit_name: data.unitName,
          previous_scout_unit: data.previousScoutUnit,
          previous_association: data.previousAssociation,
          proposal_number: data.proposalNumber,
          registration_date: data.registrationDate?.toISOString(),
          matriculation_number: data.matriculationNumber,
          has_contagious_disease: data.hasContagiousDisease,
          has_physical_robustness: data.hasPhysicalRobustness,
          medical_observations: data.medicalObservations
        })
        .eq('id', id)
        .select(`*, persons (*)`)
        .single();

      if (error) throw error;

      const scout = new Scout({
        id: updated.id,
        person: updated.person,
        groupNumber: updated.group_number,
        unitName: updated.unit_name,
        previousScoutUnit: updated.previous_scout_unit,
        previousAssociation: updated.previous_association,
        proposalNumber: updated.proposal_number,
        registrationDate: updated.registration_date ? new Date(updated.registration_date) : undefined,
        matriculationNumber: updated.matriculation_number,
        hasContagiousDisease: updated.has_contagious_disease,
        hasPhysicalRobustness: updated.has_physical_robustness,
        medicalObservations: updated.medical_observations
      });
      return scout;
    } catch (error) {
      console.error('Erro ao atualizar escuteiro:', error);
      throw new Error('Não foi possível atualizar o escuteiro');
    }
  }

  async delete(data: Scout): Promise<boolean> {
    try {
      const { error } = await supabase.from(this.tableName).delete().eq('id', data.id);
      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Erro ao deletar escuteiro:', error);
      throw new Error('Não foi possível deletar o escuteiro');
    }
  }
}