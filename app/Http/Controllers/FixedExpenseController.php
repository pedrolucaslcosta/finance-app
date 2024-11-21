<?php

namespace App\Http\Controllers;

use App\Models\FixedExpense;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FixedExpenseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('FixedExpenses', [
            'fixed_expenses' => $this->list(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'description' => ['required', 'string', 'max:50'],
            'billing_day' => ['required', 'integer', 'min:1', 'max:31'],
            'amount' => ['required', 'integer', 'min:0.1'],
        ]);

        $input = $request->all();
        $input['status'] = 'pending';

        $fixedExpense = FixedExpense::create($input);

        if (!$fixedExpense) {
            return response()->json([
                'status' => 'error',
                'message' => 'Ocorreu um erro ao salvar a despesa fixa.',
            ], 400);
        }

        return response()->json([
            'status' => 'success',
            'message' => 'Dados salvos com sucesso.',
        ]);

    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'description' => ['required', 'string', 'max:50'],
            'billing_day' => ['required', 'integer', 'min:1', 'max:31'],
            'amount' => ['required', 'integer', 'min:0.1'],
        ]);

        $input = $request->all();

        $fixedExpense = FixedExpense::find($id);

        if (!$fixedExpense) {
            return response()->json([
                'status' => 'error',
                'message' => 'Ocorreu um erro ao salvar a despesa fixa.',
            ], 400);
        }

        $fixedExpense->update($input);

        return response()->json([
            'status' => 'success',
            'message' => 'Dados salvos com sucesso.',
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $expense = FixedExpense::find($id);

        if (!$expense) {
            return response()->json(['message' => 'Despesa não encontrada'], 404);
        }

        $expense->delete();

        return response()->json(['message' => 'Despesa excluída com sucesso']);
    }

    public function list() {
        return FixedExpense::orderBy('billing_day', 'asc')->get();
    }
}
