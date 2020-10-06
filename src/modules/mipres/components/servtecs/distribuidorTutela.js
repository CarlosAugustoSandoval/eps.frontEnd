export function contentMedicamentoT(item) {
    return {
        objeto: item,
        cantidadTotal: (item.CantTotalF !== null ? Number(item.CantTotalF) : 0),
        type: 'medicamento',
        TipoTec: 'M',
        title: item.DscMedPA,
        subTitle: `Tipo Tutela: ${item.tipo_tutela}`,
        classSubTitle: [2, 4].find(x => x === item.EstJM) ? 'red--text' : 'green--text',
        cantidadFormulada: (item.CantTotalF !== null ? item.CantTotalF + (item.presentacion ? ' ' + item.presentacion.descripcion : '') : ''),
        table: [
            {label: 'Descripción', text: item.DscMedPA},
            {label: 'Tipo medicamento', text: item.tipo_medicamento},
            {label: 'Tipificación Medicamento', text: item.tipificacion_medicamento},
            {label: 'Tipo prestación', text: item.tipo_prestador},
            {
                label: 'Forma farmacéutica',
                text: item.forma_farmaceutica ? item.forma_farmaceutica.codigo + ' - ' + item.forma_farmaceutica.descripcion : ''
            },
            {
                label: 'Cantidad formulada',
                text: item.CantTotalF !== null ? item.CantTotalF + (item.presentacion ? ' ' + item.presentacion.descripcion : '') : ''
            },
            {
                label: 'Vía administración',
                text: item.via_administracion ? item.via_administracion.descripcion : ''
            },
            {
                label: 'Tratamiento',
                text: item.Dosis + (item.unidad_medida_dosis ? ' ' + item.unidad_medida_dosis.descripcion : '') + (item.NoFAdmon ? ' cada ' + item.NoFAdmon + (item.frecuencia_administracion ? ' ' + item.frecuencia_administracion : '') : '') + (item.CanTrat ? ' por ' + item.CanTrat + (item.duracion_tratamiento ? ' ' + item.duracion_tratamiento : '') : '')
            }
        ],
        list: [
            {title: 'Justificación no PBS', text: item.JustNoPBS},
            {title: 'Indicaciones especiales', text: item.indicaciones_especiales},
            {title: 'Indicaciones o recomendaciones para el paciente', text: item.IndRec},
            {
                title: 'Principios Activos', text: item.principios_activos ? item.principios_activos.map(x => {
                    return `${x.principio_activo.descripcion} ${x.ConcCant}${x.unimedida_concentracion.descripcion2}/${x.CantCont}${x.unimedida_medicamento.descripcion2}`
                }).join('; ') : ''
            }
        ],
        causasRazones: []
    }
}

export function contentComplementarioT(item) {
    return {
        objeto: item,
        cantidadTotal: (item.CantTotal !== null ? Number(item.CantTotal) : 0),
        type: 'servicio complementario',
        TipoTec: 'S',
        title: (item.CodSerComp ? item.CodSerComp : '') + (item.DescSerComp ? ' | ' + item.DescSerComp : ''),
        subTitle: `Tipo Tutela: ${item.tipo_tutela}`,
        classSubTitle: [2, 4].find(x => x === item.EstJM) ? 'red--text' : 'green--text',
        cantidadFormulada: (item.CantTotal !== null ? item.CantTotal : ''),
        table: [
            {label: 'Descripción', text: (item.CodSerComp ? item.CodSerComp : '') + (item.DescSerComp ? ' | ' + item.DescSerComp : '')},
            {label: 'Tipo prestación', text: item.TipoPrestador},
            {label: 'Cantidad formulada', text: (item.CantTotal !== null ? item.CantTotal : '')},
            {
                label: 'Tratamiento',
                text: item.CanForm + (item.CadaFreUso ? ' cada ' + item.CadaFreUso + (item.FrecuenciaUso ? ' ' + item.FrecuenciaUso : '') : '') + (item.Cant ? ' por ' + item.Cant + (item.DuracionTratamiento ? ' ' + item.DuracionTratamiento : '') : '')
            }
        ],
        list: [
            {title: 'Justificación no PBS', text: item.JustNoPBS},
            {title: 'Indicaciones o recomendaciones para el paciente', text: item.IndRec}
        ],
        causasRazones: []
    }
}

export function contentNutricionalT(item) {
    return {
        objeto: item,
        cantidadTotal: (item.CantTotalF !== null ? Number(item.CantTotalF) : 0),
        type: 'producto nutricional',
        TipoTec: 'N',
        title: item.producto ? item.producto.codigo + ' | ' + [item.producto.nombre_comercial, item.producto.descripcion].filter(x => x).join(' - ') + ` ${item.producto.presentacion_comercial}${item.producto.unidades}` : '',
        subTitle: `Tipo Tutela: ${item.tipo_tutela}`,
        classSubTitle: [2, 4].find(x => x === item.EstJM) ? 'red--text' : 'green--text',
        cantidadFormulada: (item.CantTotalF !== null ? item.CantTotalF + (item.forma_cantidad_total ? ' ' + item.forma_cantidad_total.descripcion : '') : ''),
        table: [
            {label: 'Descripción', text: item.producto ? item.producto.codigo + ' | ' + [item.producto.nombre_comercial, item.producto.descripcion].filter(x => x).join(' - ') + ` ${item.producto.presentacion_comercial}${item.producto.unidades}` : ''},
            {
                label: 'Tipo producto',
                text: item.tipo ? item.tipo.descripcion : ''
            },
            {label: 'Tipo prestación', text: item.tipo_prestador},
            {
                label: 'Forma',
                text: item.forma ? item.forma.descripcion : ''
            },
            {
                label: 'Cantidad formulada',
                text: item.CantTotalF !== null ? item.CantTotalF + (item.forma_cantidad_total ? ' ' + item.forma_cantidad_total.descripcion : '') : ''
            },
            {
                label: 'Vía administración',
                text: item.via_administracion
            },
            {
                label: 'Tratamiento',
                text: item.Dosis + (item.unidad_medida_dosis ? ' ' + item.unidad_medida_dosis.descripcion : '') + (item.NoFAdmon ? ' cada ' + item.NoFAdmon + (item.frecuencia_administracion ? ' ' + item.frecuencia_administracion : '') : '') + (item.CanTrat ? ' por ' + item.CanTrat + (item.duracion_tratamiento ? ' ' + item.duracion_tratamiento : '') : '')
            }
        ],
        list: [
            {title: 'Número de prescripción asociada', text: item.NoPrescAso, visible: item.NoPrescAso !== null},
            {title: 'Justificación no PBS', text: item.JustNoPBS},
            {title: 'Indicaciones especiales', text: item.indicaciones_especiales},
            {title: 'Indicaciones o recomendaciones para el paciente', text: item.IndRec}
        ],
        causasRazones: []
    }
}

export function contentProcedimientoT(item) {
    return {
        objeto: item,
        cantidadTotal: (item.CantTotal !== null ? Number(item.CantTotal) : 0),
        type: 'procedimiento',
        TipoTec: 'P',
        title: item.cup ? item.cup.codigo + ' | ' + item.cup.descripcion : '',
        subTitle: `Tipo Tutela: ${item.tipo_tutela}`,
        classSubTitle: [2, 4].find(x => x === item.EstJM) ? 'red--text' : 'green--text',
        cantidadFormulada: (item.CantTotal !== null ? item.CantTotal : ''),
        table: [
            {label: 'Descripción', text: item.cup ? item.cup.codigo + ' | ' + item.cup.descripcion : ''},
            {label: 'Tipificación Procedimiento', text: item.tipificacion_procedimiento},
            {label: 'Tipo prestación', text: item.tipo_prestacion},
            {label: 'Cantidad formulada', text: item.CantTotal !== null ? item.CantTotal : ''},
            {
                label: 'Tratamiento',
                text: item.CanForm + (item.CadaFreUso ? ' cada ' + item.CadaFreUso + (item.periodo_frecuencia_uso ? ' ' + item.periodo_frecuencia_uso : '') : '') + (item.Cant ? ' por ' + item.Cant + (item.periodo_duracion_tratamiento ? ' ' + item.periodo_duracion_tratamiento : '') : '')
            }
        ],
        list: [
            {title: 'Justificación no PBS', text: item.JustNoPBS},
            {title: 'Objetivo no PBS', text: item.Objetivo},
            {title: 'Indicaciones o recomendaciones para el paciente', text: item.IndRec}
        ],
        causasRazones: []
    }
}

export function contentDispositivoT(item) {
    return {
        objeto: item,
        cantidadTotal: (item.CantTotal !== null ? Number(item.CantTotal) : 0),
        type: 'dispositivo médico',
        TipoTec: 'D',
        title: item.dispositivo ? item.dispositivo.codigo + ' | ' + item.dispositivo.descripcion : '',
        subTitle: `Tipo Tutela: ${item.tipo_tutela}`,
        classSubTitle: [2, 4].find(x => x === item.EstJM) ? 'red--text' : 'green--text',
        cantidadFormulada: (item.CantTotal !== null ? item.CantTotal : ''),
        table: [
            {label: 'Descripción', text: item.dispositivo ? item.dispositivo.codigo + ' | ' + item.dispositivo.descripcion : ''},
            {label: 'Tipo prestación', text: item.tipo_prestador},
            {label: 'Cantidad formulada', text: item.CantTotal !== null ? item.CantTotal : ''},
            {
                label: 'Tratamiento',
                text: item.CanForm + (item.CadaFreUso ? ' cada ' + item.CadaFreUso + (item.frecuencia_uso ? ' ' + item.frecuencia_uso : '') : '') + (item.Cant ? ' por ' + item.Cant + (item.periodo_duracion_tratamiento ? ' ' + item.periodo_duracion_tratamiento : '') : '')
            }
        ],
        list: [
            {title: 'Justificación no PBS', text: item.JustNoPBS},
            {title: 'Indicaciones o recomendaciones para el paciente', text: item.IndRec}
        ],
        causasRazones: []
    }
}