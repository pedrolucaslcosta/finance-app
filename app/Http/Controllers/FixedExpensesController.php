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

        return Inertia::render('FixedExpense/Index', [
            'fixedExpenses' => $fixedExpenses,
        ]);
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

        return to_route('fixed-expense.index')->with('success','Conta Fixa Criada com Sucesso!');
    }

    public function show(Transaction $transaction)
    {
        return view('transactions.show', compact('transaction'));
    }

    public function edit(Transaction $transaction)
    {
        return view('transactions.edit', compact('transaction'));
    }

    public function update(Request $request, Transaction $transaction)
    {
        $validated = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
            'amount' => 'sometimes|required|numeric',
            'user_id' => 'sometimes|required|exists:users,id',
        ]);

        $transaction->update($validated);

        return redirect()->route('transactions.index');
    }

    public function destroy(Transaction $transaction)
    {
        $transaction->delete();

        return redirect()->route('transactions.index');
    }
}
