import React, { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChevronRight, ChevronLeft, UserPlus, Loader2 } from 'lucide-react';
import { Person } from '@/models/person';
import { Scout } from '@/models/scout';
import { toast } from 'sonner'; // ou use o toast do shadcn/ui
import { PersonService } from '@/service/person.service';
import { ScoutService } from '@/service/scout.service';

const FormField = ({ id, label, value, onChange, type = "text", placeholder, required = true }: any) => (
    <div className="grid gap-2">
        <Label htmlFor={id}>{label}</Label>
        <Input
            id={id}
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
        />
    </div>
);

const CheckboxField = ({ id, label, checked, onChange }: any) => (
    <div className="flex items-center space-x-2">
        <input
            type="checkbox"
            id={id}
            checked={checked}
            onChange={onChange}
            className="w-4 h-4 rounded border-gray-300"
        />
        <Label htmlFor={id} className="cursor-pointer">{label}</Label>
    </div>
);

const INITIAL_PERSON_DATA = {
    name: '', birthDate: '', gender: '', birthPlace: '',
    province: '', municipality: '', commune: '', address: '',
    phoneNumber: '', baptismDate: '', baptismChurch: ''
};

const INITIAL_SCOUT_DATA = {
    groupNumber: '', unitName: '', previousScoutUnit: '',
    previousAssociation: '', proposalNumber: '',
    hasContagiousDisease: false, hasPhysicalRobustness: true,
    medicalObservations: ''
};

interface ScoutModalProps {
    onSuccess?: () => void;
}

export default function ScoutModal({ onSuccess }: ScoutModalProps) {
    const [open, setOpen] = useState(false);
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [personData, setPersonData] = useState(INITIAL_PERSON_DATA);
    const [scoutData, setScoutData] = useState(INITIAL_SCOUT_DATA);

    const personService = new PersonService();
    const scoutService = new ScoutService();

    const handlePersonChange = (field: string, value: string) =>
        setPersonData(prev => ({ ...prev, [field]: value }));

    const handleScoutChange = (field: string, value: any) =>
        setScoutData(prev => ({ ...prev, [field]: value }));

    const validateStep1 = () => personData.name && personData.birthDate && personData.gender;
    const validateStep2 = () => scoutData.groupNumber && scoutData.unitName;

    const handleNext = () => validateStep1() && setStep(2);

    const handleSubmit = async () => {
        if (!validateStep2()) return;

        setLoading(true);

        try {
            // 1. Criar a pessoa primeiro
            const person = new Person({
                name: personData.name,
                birthDate: new Date(personData.birthDate),
                gender: personData.gender,
                birthPlace: personData.birthPlace || undefined,
                province: personData.province || undefined,
                municipality: personData.municipality || undefined,
                commune: personData.commune || undefined,
                address: personData.address || undefined,
                phoneNumber: personData.phoneNumber || undefined,
                baptismDate: personData.baptismDate ? new Date(personData.baptismDate) : undefined,
                baptismChurch: personData.baptismChurch || undefined,
            });

            const createdPerson = await personService.create(person);

            // 2. Criar o escuteiro associado à pessoa
            const scout = new Scout({
                person: createdPerson,
                groupNumber: scoutData.groupNumber,
                unitName: scoutData.unitName,
                previousScoutUnit: scoutData.previousScoutUnit || undefined,
                previousAssociation: scoutData.previousAssociation || undefined,
                proposalNumber: scoutData.proposalNumber || undefined,
                registrationDate: new Date(), // Data atual como data de registro
                hasContagiousDisease: scoutData.hasContagiousDisease,
                hasPhysicalRobustness: scoutData.hasPhysicalRobustness,
                medicalObservations: scoutData.medicalObservations || undefined,
            });

            await scoutService.create(scout);

            toast.success('Escuteiro cadastrado com sucesso!', {
                description: `${personData.name} foi registrado no sistema.`
            });

            handleClose();
            onSuccess?.(); // Callback para atualizar lista, se fornecido

        } catch (error) {
            console.error('Erro ao cadastrar escuteiro:', error);
            toast.error('Erro ao cadastrar escuteiro', {
                description: error instanceof Error ? error.message : 'Tente novamente mais tarde.'
            });
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        setOpen(false);
        setStep(1);
        setPersonData(INITIAL_PERSON_DATA);
        setScoutData(INITIAL_SCOUT_DATA);
    };

    const renderPersonalDataForm = () => (
        <div className="grid gap-4 py-4">
            <FormField
                id="name"
                label="Nome Completo *"
                value={personData.name}
                onChange={(e: any) => handlePersonChange('name', e.target.value)}
                placeholder="Nome completo do candidato"
            />

            <div className="grid grid-cols-2 gap-4">
                <FormField
                    id="birthDate"
                    label="Data de Nascimento *"
                    value={personData.birthDate}
                    onChange={(e: any) => handlePersonChange('birthDate', e.target.value)}
                    type="date"
                />

                <div className="grid gap-2">
                    <Label htmlFor="gender">Género *</Label>
                    <Select
                        value={personData.gender}
                        onValueChange={(v) => handlePersonChange('gender', v)}
                    >
                        <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Masculino">Masculino</SelectItem>
                            <SelectItem value="Feminino">Feminino</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
                <FormField
                    id="commune"
                    label="Comuna"
                    value={personData.commune}
                    onChange={(e: any) => handlePersonChange('commune', e.target.value)}
                    placeholder="Comuna"
                    required={false}
                />
                <FormField
                    id="municipality"
                    label="Município"
                    value={personData.municipality}
                    onChange={(e: any) => handlePersonChange('municipality', e.target.value)}
                    placeholder="Município"
                    required={false}
                />
                <FormField
                    id="province"
                    label="Província"
                    value={personData.province}
                    onChange={(e: any) => handlePersonChange('province', e.target.value)}
                    placeholder="Província"
                    required={false}
                />
            </div>

            <FormField
                id="address"
                label="Residência"
                value={personData.address}
                onChange={(e: any) => handlePersonChange('address', e.target.value)}
                placeholder="Endereço de residência"
                required={false}
            />

            <FormField
                id="phoneNumber"
                label="Telefone"
                value={personData.phoneNumber}
                onChange={(e: any) => handlePersonChange('phoneNumber', e.target.value)}
                placeholder="+244 XXX XXX XXX"
                required={false}
            />

            <div className="grid grid-cols-2 gap-4">
                <FormField
                    id="baptismDate"
                    label="Data de Baptismo"
                    value={personData.baptismDate}
                    onChange={(e: any) => handlePersonChange('baptismDate', e.target.value)}
                    type="date"
                    required={false}
                />
                <FormField
                    id="baptismChurch"
                    label="Igreja"
                    value={personData.baptismChurch}
                    onChange={(e: any) => handlePersonChange('baptismChurch', e.target.value)}
                    placeholder="Nome da igreja"
                    required={false}
                />
            </div>
        </div>
    );

    const renderScoutDataForm = () => (
        <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
                <FormField
                    id="groupNumber"
                    label="Número do Agrupamento *"
                    value={scoutData.groupNumber}
                    onChange={(e: any) => handleScoutChange('groupNumber', e.target.value)}
                    placeholder="Nº do Agrupamento"
                />
                <FormField
                    id="proposalNumber"
                    label="Nº da Proposta"
                    value={scoutData.proposalNumber}
                    onChange={(e: any) => handleScoutChange('proposalNumber', e.target.value)}
                    placeholder="Nº da proposta"
                    required={false}
                />
            </div>

            <FormField
                id="unitName"
                label="Unidade Escutista *"
                value={scoutData.unitName}
                onChange={(e: any) => handleScoutChange('unitName', e.target.value)}
                placeholder="Nome da Unidade"
            />

            <FormField
                id="previousScoutUnit"
                label="Unidade Anterior"
                value={scoutData.previousScoutUnit}
                onChange={(e: any) => handleScoutChange('previousScoutUnit', e.target.value)}
                placeholder="Já pertenceu a outra unidade?"
                required={false}
            />

            <FormField
                id="previousAssociation"
                label="Associação Anterior"
                value={scoutData.previousAssociation}
                onChange={(e: any) => handleScoutChange('previousAssociation', e.target.value)}
                placeholder="Já pertenceu a outra associação?"
                required={false}
            />

            <div className="border rounded-lg p-4 bg-gray-50">
                <Label className="text-base font-semibold mb-3 block">Informações Médicas</Label>

                <div className="space-y-3">
                    <CheckboxField
                        id="hasContagiousDisease"
                        label="Sofre de doença contagiosa"
                        checked={scoutData.hasContagiousDisease}
                        onChange={(e: any) => handleScoutChange('hasContagiousDisease', e.target.checked)}
                    />

                    <CheckboxField
                        id="hasPhysicalRobustness"
                        label="Tem robustez física necessária"
                        checked={scoutData.hasPhysicalRobustness}
                        onChange={(e: any) => handleScoutChange('hasPhysicalRobustness', e.target.checked)}
                    />
                </div>

                <div className="mt-3">
                    <Label htmlFor="medicalObservations">Observações Médicas</Label>
                    <textarea
                        id="medicalObservations"
                        value={scoutData.medicalObservations}
                        onChange={(e) => handleScoutChange('medicalObservations', e.target.value)}
                        placeholder="Observações adicionais..."
                        className="w-full mt-2 p-2 border rounded-md min-h-[80px]"
                    />
                </div>
            </div>
        </div>
    );

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="shadow-lg" size="lg">
                    <UserPlus className="mr-2 h-5 w-5" />
                    Cadastrar Escuteiro
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>
                        {step === 1 ? 'Dados Pessoais' : 'Dados do Escuteiro'}
                    </DialogTitle>
                    <DialogDescription>
                        {step === 1
                            ? 'Preencha as informações pessoais do candidato'
                            : 'Preencha as informações específicas do escuteiro'}
                    </DialogDescription>
                    <div className="flex items-center gap-2 pt-2">
                        <div className={`flex-1 h-2 rounded-full transition-colors ${step >= 1 ? 'bg-green-600' : 'bg-gray-200'}`} />
                        <div className={`flex-1 h-2 rounded-full transition-colors ${step >= 2 ? 'bg-green-600' : 'bg-gray-200'}`} />
                    </div>
                </DialogHeader>

                {step === 1 ? renderPersonalDataForm() : renderScoutDataForm()}

                <DialogFooter className="gap-2">
                    <Button variant="outline" onClick={handleClose} disabled={loading}>
                        Cancelar
                    </Button>
                    {step === 1 ? (
                        <Button onClick={handleNext} disabled={!validateStep1()}>
                            Próximo
                            <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                    ) : (
                        <>
                            <Button variant="outline" onClick={() => setStep(1)} disabled={loading}>
                                <ChevronLeft className="mr-2 h-4 w-4" />
                                Voltar
                            </Button>
                            <Button onClick={handleSubmit} disabled={!validateStep2() || loading}>
                                {loading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Cadastrando...
                                    </>
                                ) : (
                                    'Cadastrar'
                                )}
                            </Button>
                        </>
                    )}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}