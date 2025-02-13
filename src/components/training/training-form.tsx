'use client'
import { useToast } from '@/hooks/use-toast'
import createTraining from '@/lib/actions/training/create-training'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import { Input } from '../ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Textarea } from '../ui/textarea'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { cn, formatDate } from '@/lib/utils'
import { CalendarIcon } from 'lucide-react'
import { Calendar } from '../ui/calendar'

const trainingSchema = z.object({
  nama: z.string().nonempty({
    message: 'Nama tidak boleh kosong',
  }),
  namaTrainer: z.string().nonempty({
    message: 'Nama Trainer tidak boleh kosong',
  }),
  kapasitas: z.number().int().positive({
    message: 'Kapasitas harus berupa angka positif',
  }),
  tipe: z
    .enum(['private', 'public'], {
      required_error: 'Tipe tidak boleh kosong',
    })
    .refine((val) => val !== undefined, {
      message: 'Tipe tidak boleh kosong',
    }),
  deskripsi: z.string().nonempty({
    message: 'Deskripsi tidak boleh kosong',
  }),
  tanggal: z.date({
    required_error: 'Tanggal lahir tidak boleh kosong',
  }),
  durasi: z.number().int().positive({
    message: 'Durasi harus berupa angka positif',
  }),
})

export default function TrainingForm() {
  const { toast } = useToast()
  const router = useRouter()

  const form = useForm<z.infer<typeof trainingSchema>>({
    resolver: zodResolver(trainingSchema),
    defaultValues: {
      nama: '',
      namaTrainer: '',
      kapasitas: 0,
      tipe: undefined,
      deskripsi: '',
      tanggal: undefined,
      durasi: 0,
    },
  })

  const tipeOptions = [
    { label: 'Private', value: 'private' },
    { label: 'Public', value: 'public' },
  ]

  async function onSubmit(values: z.infer<typeof trainingSchema>) {
    try {
      const { nama, namaTrainer, kapasitas, tipe, deskripsi, tanggal, durasi } = values

      const message = await createTraining({
        nama,
        namaTrainer,
        kapasitas,
        tipe,
        deskripsi,
        tanggal,
        durasi,
      })

      toast({
        title: 'Berhasil',
        description: message,
      })

      router.push('/hr/trainings')
    } catch (error: any) {
      toast({
        title: 'Gagal',
        description: error.message,
        variant: 'destructive',
      })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="nama"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nama</FormLabel>
                <FormControl>
                  <Input placeholder="Masukkan nama" {...field} />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="namaTrainer"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nama Trainer</FormLabel>
                <FormControl>
                  <Input placeholder="Masukkan nama trainer" {...field} />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="kapasitas"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Kapasitas</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Masukkan kapasitas"
                    {...field}
                    onChange={(event) => field.onChange(+event.target.value)}
                  />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="tipe"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih tipe" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {tipeOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="tanggal"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="inline">Tanggal Lahir</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={'outline'}
                        className={cn(
                          ' pl-3 text-left font-normal mt-4 w-full',
                          !field.value && 'text-muted-foreground'
                        )}
                      >
                        {field.value ? formatDate(field.value) : <span>Pilih tanggal</span>}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      captionLayout="dropdown-buttons"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
                      fromYear={1960}
                      toYear={2030}
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="durasi"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Durasi (menit)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Masukkan durasi"
                    {...field}
                    onChange={(event) => field.onChange(+event.target.value)}
                  />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="deskripsi"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Deskripsi</FormLabel>
                <FormControl>
                  <Textarea
                    className="h-28 resize-none"
                    placeholder="Masukkan deskripsi"
                    {...field}
                  />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex items-center justify-end gap-2">
          <Button type="button" onClick={() => form.reset()} variant="secondary">
            Reset
          </Button>
          <Button type="submit">Simpan</Button>
        </div>
      </form>
    </Form>
  )
}
