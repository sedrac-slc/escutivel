import { CrudService } from "@/interface/crud.service";
import { Person } from "@/models/person";
import { supabase } from "@/supabase";

export class PersonService implements CrudService<Person> {
    private tableName = 'persons';

    async findAll(): Promise<Person[]> {
        try {
            const { data, error } = await supabase
                .from(this.tableName)
                .select('*')
                .order('name', { ascending: true });

            if (error) throw error;

            return (data || []).map(item => {
                const person = new Person({
                    id: item.id,
                    name: item.name,
                    birthDate: new Date(item.birth_date),
                    gender: item.gender,
                    birthPlace: item.birth_place,
                    province: item.province,
                    municipality: item.municipality,
                    commune: item.commune,
                    address: item.address,
                    phoneNumber: item.phone_number,
                    baptismDate: item.baptism_date ? new Date(item.baptism_date) : undefined,
                    baptismChurch: item.baptism_church
                });
                return person;
            });
        } catch (error) {
            console.error('Erro ao buscar pessoas:', error);
            throw new Error('Não foi possível buscar as pessoas');
        }
    }

    async create(data: Person): Promise<Person> {
        try {
            const { data: inserted, error } = await supabase
                .from(this.tableName)
                .insert({
                    name: data.name,
                    birth_date: data.birthDate.toISOString(),
                    gender: data.gender,
                    birth_place: data.birthPlace,
                    province: data.province,
                    municipality: data.municipality,
                    commune: data.commune,
                    address: data.address,
                    phone_number: data.phoneNumber,
                    baptism_date: data.baptismDate?.toISOString(),
                    baptism_church: data.baptismChurch
                })
                .select()
                .single();

            if (error) throw error;

            const person = new Person({
                id: inserted.id,
                name: inserted.name,
                birthDate: new Date(inserted.birth_date),
                gender: inserted.gender,
                birthPlace: inserted.birth_place,
                province: inserted.province,
                municipality: inserted.municipality,
                commune: inserted.commune,
                address: inserted.address,
                phoneNumber: inserted.phone_number,
                baptismDate: inserted.baptism_date ? new Date(inserted.baptism_date) : undefined,
                baptismChurch: inserted.baptism_church
            });
            return person;
        } catch (error) {
            console.error('Erro ao criar pessoa:', error);
            throw new Error('Não foi possível criar a pessoa');
        }
    }

    async update(data: Person, id: string): Promise<Person> {
        try {
            const { data: updated, error } = await supabase
                .from(this.tableName)
                .update({
                    name: data.name,
                    birth_date: data.birthDate.toISOString(),
                    gender: data.gender,
                    birth_place: data.birthPlace,
                    province: data.province,
                    municipality: data.municipality,
                    commune: data.commune,
                    address: data.address,
                    phone_number: data.phoneNumber,
                    baptism_date: data.baptismDate?.toISOString(),
                    baptism_church: data.baptismChurch
                })
                .eq('id', id)
                .select()
                .single();

            if (error) throw error;

            const person = new Person({
                id: updated.id,
                name: updated.name,
                birthDate: new Date(updated.birth_date),
                gender: updated.gender,
                birthPlace: updated.birth_place,
                province: updated.province,
                municipality: updated.municipality,
                commune: updated.commune,
                address: updated.address,
                phoneNumber: updated.phone_number,
                baptismDate: updated.baptism_date ? new Date(updated.baptism_date) : undefined,
                baptismChurch: updated.baptism_church
            });
            return person;
        } catch (error) {
            console.error('Erro ao atualizar pessoa:', error);
            throw new Error('Não foi possível atualizar a pessoa');
        }
    }

    async delete(data: Person): Promise<boolean> {
        try {
            const { error } = await supabase
                .from(this.tableName)
                .delete()
                .eq('id', data.id);
            if (error) throw error;
            return true;
        } catch (error) {
            console.error('Erro ao deletar pessoa:', error);
            throw new Error('Não foi possível deletar a pessoa');
        }
    }
}