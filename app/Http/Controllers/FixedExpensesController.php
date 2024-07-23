<?php

namespace App\Http\Controllers;

use App\Models\FixedExpense;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FixedExpensesController extends Controller
{
    public function index()
    {
        $fixedExpenses = FixedExpense::all();
        return Inertia::render('FixedExpense/Index', ['fixedExpenses' => $fixedExpenses]);
    }

    public function create()
    {
        return Inertia::render('FixedExpense/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'description' => 'nullable|string',
            'amount' => 'required|numeric',
        ]);

        $validated['user_id'] = auth()->id();

        FixedExpense::create($validated);

        return redirect()->route('fixed-expense.index')->with('success', 'Conta Fixa Criada com Sucesso!');
    }

    public function show(FixedExpense $fixedExpense)
    {
        return redirect()->route('fixed-expense.index')->with('error', 'Função não implementada.');
    }

    public function edit(FixedExpense $fixedExpense)
    {
        return Inertia::render('FixedExpenses/Edit', ['fixedExpense' => $fixedExpense]);
    }

    public function update(Request $request, FixedExpense $fixedExpense)
    {
        $validated = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
            'amount' => 'sometimes|required|numeric',
            'user_id' => 'sometimes|required|exists:users,id',
        ]);

        $fixedExpense->update($validated);

        return redirect()->route('fixed-expense.index')->with('success', 'Conta Fixa Atualizada com Sucesso!');
    }

    public function destroy(FixedExpense $fixedExpense)
    {
        $fixedExpense->delete();
        return redirect()->route('fixed-expenses.index')->with('success', 'Conta Fixa Excluída com Sucesso!');
    }
}
